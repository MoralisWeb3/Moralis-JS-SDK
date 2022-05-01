import type Parse from 'parse';
import TypedEmitter from 'typed-emitter';
import { Logger, MoralisServerError, MoralisState, ServerErrorCode } from '@moralis/core';
import { State, StateContext, StateEvent } from './types';
import { handleAuth } from '../AuthMethods/handleAuth';
import { Authenticate, AuthenticateData, AuthMethod } from '../AuthMethods/types';
import { ServerEvent, ServerEventMap } from '../events/ServerEvents';
import { assertInstance } from '../assert/assertInstance';
import { handleLogout } from '../AuthMethods/handleLogout';

// TODO: handle defaults from config
// TODO: make typesafe with accordance of config defaults
// TODO: support other auth methods as well, and don't assume any type (as any module can be registered)
// TODO: account for default network, and default method and default connector...
// TODO: make this logout request async and account for errors. Possible error and logging-out state in the state maching?
// TODO: set default authenticateMessage in core/when using Moralis.start

export class Authentication extends MoralisState<StateContext, StateEvent, State> {
  private _server: typeof Parse | null = null;
  private _logger;
  private _emitter;

  authenticateMessage = 'Moralis Authentication';

  constructor(logger: Logger, emitter: TypedEmitter<ServerEventMap>) {
    super('Authentication');
    this._logger = logger;
    this._emitter = emitter;

    this.start({
      initial: 'Unauthenticated',
      states: {
        Unauthenticated: {
          entry: this.handleUnauthenticated,
          on: {
            AUTHENTICATE: {
              target: 'Authenticating',
            },
          },
        },
        Authenticating: {
          entry: this.handleAuthenticating,
          on: {
            AUTHENTICATE_SUCCESS: {
              target: 'Authenticated',
            },
            AUTHENTICATE_ERROR: {
              target: 'Unauthenticated',
            },
          },
        },
        Authenticated: {
          entry: this.handleAuthenticated,
          on: {
            LOGOUT: {
              target: 'Unauthenticated',
            },
          },
        },
      },
    });
  }

  setServer(parse: typeof Parse) {
    this._server = parse;
  }

  setMessage(message: string) {
    this.authenticateMessage = message;
  }

  /**
   * State change handlers
   */

  private handleUnauthenticated = (context: StateContext, event: StateEvent) => {
    if (event.type === 'xstate.init') {
      // Don't do anything initially, as we start in unauthenticated state
      return;
    }

    this._logger.verbose('Logged out', { context, event });
    this._emitter.emit(ServerEvent.LOGGED_OUT);

    if (event.type === 'AUTHENTICATE_ERROR') {
      const error = event.data;

      this._emitter.emit(ServerEvent.AUTHENTICATING_ERROR, error);

      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: `Connection failed: ${error.name}: ${error.message}`,
        cause: error,
      });
    }
  };

  private handleAuthenticating = (context: StateContext, event: StateEvent) => {
    this._logger.verbose('Authenticating', { context, event });

    if (event.type !== 'AUTHENTICATE') {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate, authentication triggered incorrectly.',
      });
    }

    const { method, options } = event.data;
    const server = assertInstance(this._server);

    this._emitter.emit(ServerEvent.AUTHENTICATING);

    handleAuth({ message: this.authenticateMessage, method, server: server, options })
      .then((data) => this.transition({ type: 'AUTHENTICATE_SUCCESS', data }))
      .catch((error) => this.transition({ type: 'AUTHENTICATE_ERROR', data: error }));
  };

  private handleAuthenticated = (context: StateContext, event: StateEvent) => {
    this._logger.verbose('Authenticated', { context, event });

    // Code should not be able to get to here without the AUTHENTICATE_SUCCESS event.
    // Jsut to be sure, and for type safety, we do an error check
    if (event.type !== 'AUTHENTICATE_SUCCESS') {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Something unexpected happened in authentication. Authentication might have failed.',
      });
    }

    this._emitter.emit(ServerEvent.AUTHENTICATED, event.data);
  };

  /**
   * Utilities
   */

  get isAuthenticated() {
    return this.match('Authenticated');
  }

  get isAuthenticating() {
    return this.match('Authenticating');
  }

  get canAuthenticate() {
    return !this.isAuthenticating;
  }

  /**
   * Trigger state changes
   */

  authenticate: Authenticate = async (method, options) => {
    if (method !== AuthMethod.EVM) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Authentication method not supported yet',
      });
    }

    if (this.isAuthenticating) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate, as an authentication attempt is already pending.',
      });
    }

    if (this.isAuthenticated) {
      await this.logout();
    }

    if (!this.can('AUTHENTICATE')) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate.',
      });
    }

    this.transition({
      type: 'AUTHENTICATE',
      data: {
        method,
        options,
      },
    });

    return new Promise((resolve, reject) => {
      const handleResolve = (data: AuthenticateData) => {
        resolve(data);
        this._emitter.off(ServerEvent.AUTHENTICATED, handleResolve);
        this._emitter.off(ServerEvent.AUTHENTICATING_ERROR, handleReject);
      };
      const handleReject = (error: Error) => {
        reject(error);
        this._emitter.off(ServerEvent.AUTHENTICATED, handleResolve);
        this._emitter.off(ServerEvent.AUTHENTICATING_ERROR, handleReject);
      };

      this._emitter.on(ServerEvent.AUTHENTICATED, handleResolve);
      this._emitter.on(ServerEvent.AUTHENTICATING_ERROR, handleReject);
    });
  };

  logout = async () => {
    if (!this.can('LOGOUT')) {
      throw new MoralisServerError({
        code: ServerErrorCode.LOGOUT_FAILED,
        message: 'Cannot logout as no logged in session is active.',
      });
    }

    const server = assertInstance(this._server);
    await handleLogout({ server });

    this.transition({ type: 'LOGOUT' });
  };
}
