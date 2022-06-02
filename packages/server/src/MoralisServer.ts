import core, { BaseModule } from '@moralisweb3/core';
import type Parse from 'parse';
import { initializeParse } from './initializeParse';
import { ServerEvent, ServerEventMap } from './events/ServerEvents';
import { Authentication } from './Authentication/Authentication';
import { Authenticate } from './AuthMethods/types';
import { assertInstance } from './assert/assertInstance';
import { getIPFS } from './utils/ipfs';

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
      environment: this.core.config.get('buidEnvironment'),
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
   * Server utility methods
   */
  currentUser() {
    return this.instance().User.current();
  }

  currentUserAsync() {
    return this.instance().User.currentAsync();
  }

  fetchIPFS(ipfsHash: string) {
    return getIPFS(ipfsHash);
  }

  /**
   * Parse access
   */
  instance() {
    return assertInstance(this._parse);
  }

  get ACL() {
    return this.instance().ACL;
  }

  get CLP() {
    // @ts-ignore Not typed in parse
    return this.instance().CLP;
  }

  get Cloud() {
    return this.instance().Cloud;
  }

  get File() {
    return this.instance().File;
  }

  get GeoPoint() {
    return this.instance().GeoPoint;
  }

  get Polygon() {
    return this.instance().Polygon;
  }

  get LocalDatastore() {
    // @ts-ignore Not typed in parse
    return this.instance().LocalDatastore;
  }

  get Object() {
    return this.instance().Object;
  }

  get Op() {
    // @ts-ignore Not typed in parse
    return this.instance().Op;
  }

  get Query() {
    return this.instance().Query;
  }

  get Relation() {
    return this.instance().Relation;
  }

  get Role() {
    return this.instance().Role;
  }

  get Session() {
    return this.instance().Session;
  }

  get Storage() {
    // @ts-ignore Not typed in parse
    return this.instance().Storage;
  }

  get User() {
    return this.instance().User;
  }

  get LiveQuery() {
    // @ts-ignore Not typed in parse
    return this.instance().LiveQuery;
  }

  get LiveQueryClient() {
    // @ts-ignore Not typed in parse
    return this.instance().LiveQueryClient;
  }
}

const moralisServer = new MoralisServer();
export default moralisServer;
