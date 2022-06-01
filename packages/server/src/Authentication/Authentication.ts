import type Parse from 'parse';
import TypedEmitter from 'typed-emitter';
import core, { Logger, MoralisServerError, MoralisState, ServerErrorCode } from '@moralisweb3/core';
import { State, StateContext, StateEvent } from './types';
import { handleAuth } from '../AuthMethods/handleAuth';
import { Authenticate, AuthenticateData, AuthMethod } from '../AuthMethods/types';
import { ServerEvent, ServerEventMap } from '../events/ServerEvents';
import { assertInstance } from '../assert/assertInstance';
import { handleLogout } from '../AuthMethods/handleLogout';
import { handleSignUp, SignUpOptions } from '../AuthMethods/handleSignUp';
import { handleSignIn, SignInOptions } from '../AuthMethods/handleSignIn';

export class Authentication extends MoralisState<StateContext, StateEvent, State> {
  private _server: typeof Parse | null = null;
  private _logger;
  private _emitter;

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
            NETWORK_AUTHENTICATE: {
              target: 'Authenticating',
            },
            SIGN_UP: {
              target: 'Authenticating',
            },
            SIGN_IN: {
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

  setAuthenticationMessage(message: string) {
    core.config.set('authenticationMessage', message);
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

    if (event.type === 'NETWORK_AUTHENTICATE') {
      const { method, options } = event.data;
      const server = assertInstance(this._server);

      this._emitter.emit(ServerEvent.AUTHENTICATING);

      return handleAuth({ message: core.config.get('authenticationMessage'), method, server: server, options })
        .then((data) => this.transition({ type: 'AUTHENTICATE_SUCCESS', data }))
        .catch((error) => this.transition({ type: 'AUTHENTICATE_ERROR', data: error }));
    }

    if (event.type === 'SIGN_UP') {
      const { username, password, fields } = event.data.options;
      const server = assertInstance(this._server);

      this._emitter.emit(ServerEvent.AUTHENTICATING);

      return handleSignUp({ server, username, password, fields })
        .then((data) => this.transition({ type: 'AUTHENTICATE_SUCCESS', data }))
        .catch((error) => this.transition({ type: 'AUTHENTICATE_ERROR', data: error }));
    }

    if (event.type === 'SIGN_IN') {
      const { username, password } = event.data.options;
      const server = assertInstance(this._server);

      this._emitter.emit(ServerEvent.AUTHENTICATING);

      return handleSignIn({ server, username, password })
        .then((data) => this.transition({ type: 'AUTHENTICATE_SUCCESS', data }))
        .catch((error) => this.transition({ type: 'AUTHENTICATE_ERROR', data: error }));
    }

    throw new MoralisServerError({
      code: ServerErrorCode.AUTHENTICATION_FAILED,
      message: 'Cannot authenticate, authentication triggered with unsupported method.',
    });
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

    if (!this.can('NETWORK_AUTHENTICATE')) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate from this state, this should not have happened.',
      });
    }

    this.transition({
      type: 'NETWORK_AUTHENTICATE',
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

  signUp = async (options: SignUpOptions) => {
    if (this.isAuthenticating) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate, as an authentication attempt is already pending.',
      });
    }

    if (this.isAuthenticated) {
      await this.logout();
    }

    if (!this.can('SIGN_UP')) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate from this state, this should not have happened.',
      });
    }

    this.transition({
      type: 'SIGN_UP',
      data: {
        method: AuthMethod.SIGN_UP,
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

  signIn = async (options: SignInOptions) => {
    if (this.isAuthenticating) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate, as an authentication attempt is already pending.',
      });
    }

    if (this.isAuthenticated) {
      await this.logout();
    }

    if (!this.can('SIGN_IN')) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: 'Cannot authenticate from this state, this should not have happened.',
      });
    }

    this.transition({
      type: 'SIGN_IN',
      data: {
        method: AuthMethod.SIGN_IN,
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
