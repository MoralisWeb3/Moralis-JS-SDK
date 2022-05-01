import core, { BaseModule, MoralisServerError, ServerErrorCode } from '@moralis/core';
import { interpret } from 'xstate';
import { stateMachine } from './State/stateMachine';
import type Parse from 'parse';
import { initializeParse } from './initializeParse';
import {
  OnAuthenticatedCallback,
  OnAuthenticatingCallback,
  OnAuthenticatingErrorCallback,
  OnInitializedCallback,
  OnLogoutCallback,
  ServerEvent,
} from './events';
import { AuthenticateData, EvmAuthenticate, createAuthenticateCallback } from './Authenticate/EvmAuth';

// TODO: set restontroller (maybe even set in globally in Core?)
// TODO: setup parse via NodeJs, and or react native
// TODO: add verbose logs
// TODO: make compatible with SOL connect or other connect methods ( probably use type guards)
// TODO: error handling on forwarding to parse, ideally we want to wrap any of the function calls of Parse in an Error handler that makes it a MoralisError, alternatively, we could at least implement our own RESTcontroller
export class MoralisServer extends BaseModule {
  stateService;
  stateMachine;
  parse: typeof Parse | null = null;
  authenticateMessage = 'Moralis Authentication';

  constructor() {
    super({
      core,
      name: 'server',
    });
    this.stateMachine = stateMachine.withConfig({
      actions: {
        // WIP: add handlers
        onInitialized: (context, event) => this.handleInitialized(),
        onAuthenticating: (context, event) => this.handleAuthenticating(),
        onAuthenticateSuccess: (context, event) =>
          this.handleAuthenticateSuccess({
            user: event.data,
          }),
        onUnauthenticated: (context, event) => this.handleUnauthenticated(),
        onAuthenticateError: (context, event) => this.handleAuthenticateError(event.data),
      },
      services: {
        authenticateInvoker: (context, event) =>
          createAuthenticateCallback(event, this._server, this.authenticateMessage, this.logger),
      },
    });
    this.stateService = interpret(this.stateMachine).start();
  }

  async start() {
    this.logger.verbose('Initializing Parse server');
    this.parse = await initializeParse({
      appId: this.core.config.get('appId'),
      serverUrl: this.core.config.get('serverUrl'),
      environment: this.core.config.get('environment'),
    });

    this.logger.verbose('Initialize Parse server complete');

    this.stateService.send({ type: 'INITIALIZE' });
  }

  // Add event listeners
  onInitialized = (listener: OnInitializedCallback) => this.listen(ServerEvent.INITIALIZED, listener);
  onAuthenticating = (listener: OnAuthenticatingCallback) => this.listen(ServerEvent.AUTHENTICATING, listener);
  onAuthenticated = (listener: OnAuthenticatedCallback) => this.listen(ServerEvent.AUTHENTICATED, listener);
  onAutenticatingError = (listener: OnAuthenticatingErrorCallback) =>
    this.listen(ServerEvent.AUTHENTICATING_ERROR, listener);
  onLogout = (listener: OnLogoutCallback) => this.listen(ServerEvent.LOGOUT, listener);

  // Getters
  // TODO: add getters to check current state/canXXX
  get isInitialized() {
    // TODO: chekck if this also accounts for substates
    return this.stateService.state.matches('Initialized');
  }

  // private _parseCall<Args extends unknown[], Result extends unknown>(call: (...args: Args) => Result, ...args: Args) {
  //   try {
  //     call(...args);
  //   } catch (error) {
  //     // Check Parse.Error, then specific error handler
  //     // Otherwise generic Moralis parse-server error
  //   }
  // }

  // private _parseAsyncCall<Args extends unknown[], Result extends unknown>(
  //   call: (...args: Args) => Promise<Result>,
  //   ...args: Args
  // ) {
  //   try {
  //     call(...args);
  //   } catch (error) {
  //     // Check Parse.Error, then specific error handler
  //     // Otherwise generic Moralis parse-server error
  //   }
  // }

  // TODO: add Parse-sdk error handling to resolve Parse errors into moralis errors when possible
  // Forward to Parse-SDK
  get Object() {
    return this._server.Object;
  }
  get Query() {
    return this._server.Query;
  }
  get User() {
    // TODO: add syntax sugar?
    return this._server.User;
  }
  get File() {
    return this._server.File;
  }
  get Schema() {
    return this._server.Schema;
  }
  get Cloud() {
    return this._server.Cloud;
  }

  get Session() {
    return this._server.Session;
  }
  get Role() {
    return this._server.Role;
  }
  get GeoPoint() {
    return this._server.GeoPoint;
  }

  // Ommiting classes
  // Moralis.ACL = require('./ParseACL').default;
  // Moralis.Analytics = require('./Analytics');
  // Moralis.AnonymousUtils = require('./AnonymousUtils').default;
  // Moralis.Cloud = require('./Cloud');
  // Moralis.CLP = require('./ParseCLP').default;
  // Moralis.CoreManager = require('./CoreManager');
  // Moralis.Config = require('./ParseConfig').default;
  // Moralis.Error = require('./ParseError').default;
  // Moralis.FacebookUtils = require('./FacebookUtils').default;
  // Moralis.Polygon = require('./ParsePolygon').default;
  // Moralis.Installation = require('./ParseInstallation').default;
  // Moralis.LocalDatastore = require('./LocalDatastore');
  // Moralis.Op = {
  //   Set: ParseOp.SetOp,
  //   Unset: ParseOp.UnsetOp,
  //   Increment: ParseOp.IncrementOp,
  //   Add: ParseOp.AddOp,
  //   Remove: ParseOp.RemoveOp,
  //   AddUnique: ParseOp.AddUniqueOp,
  //   Relation: ParseOp.RelationOp,
  // };
  // Moralis.Push = require('./Push');
  // Moralis.Relation = require('./ParseRelation').default;
  // Moralis.Storage = require('./Storage');
  // Moralis.LiveQuery = require('./ParseLiveQuery').default;
  // Moralis.LiveQueryClient = require('./LiveQueryClient').default;

  // TODO: add validation when calling parse?
  get _server() {
    if (!this.parse) {
      throw new MoralisServerError({ code: ServerErrorCode.NOT_INITIALIZED, message: 'Server is not initialized' });
    }
    return this.parse;
  }

  setAuthenticateMessage(message: string) {
    this.authenticateMessage = message;
  }

  authenticate: EvmAuthenticate = (network, wallet, options) => {
    // WIP
    // TODO: default to "EVM" network

    // TODO: if already connected, disconnect???
    // TODO: if already authenticated, unauthenticate??

    // TODO: differentiate different auth types
    // TODO: verify if can authenticate

    this.stateService.send({ type: 'AUTHENTICATE', network, wallet, options });

    // WIP: return user
    return Promise.resolve({
      user: null,
    });
  };

  // State change handlers
  private handleInitialized = () => {
    this.logger.verbose(`Initialized`);
    this.emit(ServerEvent.INITIALIZED);
  };

  private handleAuthenticating = () => {
    this.logger.verbose(`Authenticating`);

    this.emit(ServerEvent.AUTHENTICATING);
  };

  private handleAuthenticateSuccess = (data: AuthenticateData) => {
    this.logger.verbose(`Authenticate success`, { data });

    this.emit(ServerEvent.AUTHENTICATED);
  };

  private handleUnauthenticated = () => {
    this.logger.verbose(`Logged out`);

    this.emit(ServerEvent.LOGOUT);
  };

  private handleAuthenticateError = (error: Error) => {
    this.logger.verbose(`Authenticating error`, { error });

    this.emit(ServerEvent.AUTHENTICATING_ERROR);

    throw new MoralisServerError({
      code: ServerErrorCode.AUTHENTICATION_FAILED,
      message: `Authentication failed: ${error.name}: ${error.message}`,
      cause: error,
    });
  };
}

const moralisServer = new MoralisServer();
export default moralisServer;
