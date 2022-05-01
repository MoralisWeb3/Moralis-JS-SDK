import core, { BaseModule } from '@moralis/core';
import type Parse from 'parse';
import { initializeParse } from './initializeParse';
import { ServerEvent, ServerEventMap } from './events/ServerEvents';
import { Authentication } from './Authentication/Authentication';
import { Authenticate } from './AuthMethods/types';
import { assertInstance } from './assert/assertInstance';

// TODO: set restontroller (maybe even set in globally in Core?)
// TODO: setup parse via NodeJs, and or react native
// TODO: add verbose logs
// TODO: make compatible with SOL connect or other connect methods ( probably use type guards)
// TODO: error handling on forwarding to parse, ideally we want to wrap any of the function calls of Parse in an Error handler that makes it a MoralisError, alternatively, we could at least implement our own RESTcontroller
// TODO: add Parse-sdk error handling to resolve Parse errors into moralis errors when possible

export class MoralisServer extends BaseModule<ServerEventMap> {
  private _parse: typeof Parse | null = null;

  authentication: Authentication = new Authentication(this.logger, this.emitter);

  constructor() {
    super({
      core,
      name: 'server',
    });
  }

  start = async () => {
    this.logger.verbose('Initializing Parse server');
    this._parse = await initializeParse({
      appId: this.core.config.get('appId'),
      serverUrl: this.core.config.get('serverUrl'),
      environment: this.core.config.get('environment'),
    });
    this.authentication.setServer(this._parse);

    this.logger.verbose('Initialize Parse server complete');
    this.emitter.emit(ServerEvent.INITIALIZED);
  };

  /**
   * Event listeners
   */

  onInitialized = (fn: ServerEventMap['Initialized']) => this.listen(ServerEvent.INITIALIZED, fn);
  onAuthenticating = (fn: ServerEventMap['Authenticating']) => this.listen(ServerEvent.AUTHENTICATING, fn);
  onAuthenticated = (fn: ServerEventMap['Authenticated']) => this.listen(ServerEvent.AUTHENTICATED, fn);
  onAutenticatingError = (fn: ServerEventMap['AuthenticatingError']) =>
    this.listen(ServerEvent.AUTHENTICATING_ERROR, fn);
  onLoggedOut = (fn: ServerEventMap['LoggedOut']) => this.listen(ServerEvent.LOGGED_OUT, fn);

  /**
   * General getters
   */

  get isInitialized() {
    return this._parse !== null;
  }

  /**
   * Authentication getters
   */

  /**
   * Authentication methods
   */

  setAuthenticateMessage(message: string) {
    this.authentication.setMessage(message);
  }

  authenticate: Authenticate = (method, options) => {
    return this.authentication.authenticate(method, options);
  };

  logout = () => {
    return this.authentication.logout();
  };

  /**
   * Parse access
   */
  instance() {
    return assertInstance(this._parse);
  }

  // get ACL() {
  //   return this.instance().ACL;
  // }

  // ACL = this.instance().ACL;
  // Polygon = this.instance().Polygon;
  // Object = this.instance().Object;
  // Query = this.instance().Query;
  // User = this.instance().User;
  // File = this.instance().File;
  // Schema = this.instance().Schema;
  // Cloud = this.instance().Cloud;
  // Session = this.instance().Session;
  // Role = this.instance().Role;
  // GeoPoint = this.instance().GeoPoint;
}

const moralisServer = new MoralisServer();
export default moralisServer;
