import core, { BaseModule, EvmAddress, EvmAddressish, MoralisServerError, ServerErrorCode } from '@moralisweb3/core';
import type Parse from 'parse';
import { initializeParse } from './initializeParse';
import { ServerEvent, ServerEventMap } from './events/ServerEvents';
import { Authentication } from './Authentication/Authentication';
import { Authenticate } from './AuthMethods/types';
import { assertInstance } from './assert/assertInstance';
import { createSigningData } from './AuthMethods/utils/createSigningData';

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
   * Link address to user profile
   */
  link = async (account: EvmAddressish) => {
    const user = await this.User.currentAsync();
    if (!user) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: `No logged in user`,
      });
    }
    const address = EvmAddress.create(account).lowercase;

    const EthAddress = this.Object.extend('_EthAddress');
    const query = new this.Query(EthAddress);
    const ethAddressRecord = await query.get(address).catch(() => null);
    if (!ethAddressRecord) {
      const network = core.modules.getNetwork('evm');
      const data = await createSigningData({ message: 'Moralis: Link users', server: this.instance() });
      const signature = await network.signMessage(data);

      if (!signature) {
        throw new MoralisServerError({
          code: ServerErrorCode.DATA_NOT_SIGNED,
          message: `Data not signed`,
        });
      }
      const authData = { id: address, signature, data };
      await user.linkWith('moralisEth', { authData });
    }
    user.addAllUnique('accounts', [address]);
    user.set('ethAddress', address);
    await user.save(null, {});
    return user;
  };

  /**
   * Unlink address to user profile
   */
  unlink = async (account: EvmAddressish) => {
    const accountsLower = EvmAddress.create(account).lowercase;
    const EthAddress = this.Object.extend('_EthAddress');
    const query = new this.Query(EthAddress);
    const ethAddressRecord = await query.get(accountsLower);
    await ethAddressRecord.destroy();
    const user = await this.User.currentAsync();
    if (!user) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: `No logged in user`,
      });
    }
    const accounts = user.get('accounts') ?? [];
    const nextAccounts = accounts.filter((v: string) => v !== accountsLower);
    user.set('accounts', nextAccounts);
    user.set('ethAddress', nextAccounts[0]);
    await user._unlinkFrom('moralisEth');
    await user.save();
    return user;
  };

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
