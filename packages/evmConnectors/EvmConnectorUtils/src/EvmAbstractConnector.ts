import EventEmitter from 'eventemitter3';
import { EvmConnectorEvent } from './events';
import {
  EvmAddress,
  EvmBaseConnectOptions,
  EvmChain,
  EvmConnection,
  EvmProvider,
  EvmProviderEvent,
  ProviderAccounts,
  ProviderChainId,
  ProviderInfo,
  ProviderRpcError,
  LoggerController,
  MoralisCore,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
} from '@moralisweb3/core';

/**
 * Abstract connector to connect EIP-1193 providers to Moralis
 *
 * It should implement at least:
 * - createProvider()
 * - createConnection()
 * - name: a name to identify
 * - network: the network type that is used (eg. 'evm')
 */
export abstract class EvmAbstractConnector<
  Provider extends EvmProvider = EvmProvider,
  Options extends EvmBaseConnectOptions = EvmBaseConnectOptions,
> extends EventEmitter {
  public readonly network = 'evm';
  protected readonly logger: LoggerController;

  private _provider: Provider | null = null;
  public get provider(): Provider | null {
    return this._provider;
  }

  private _chain: EvmChain | null = null;
  public get chain(): EvmChain | null {
    return this._chain;
  }

  private _account: EvmAddress | null = null;
  public get account(): EvmAddress | null {
    return this._account;
  }

  public constructor(public readonly name: string, protected readonly core: MoralisCore) {
    super();
    this.name = name;
    this.logger = new LoggerController(this.core.config, `evmConnector: ${this.name}`);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  public async connect(options?: Options): Promise<EvmConnection> {
    const connection = await this.createConnection(options);
    this._account = connection.account;
    this._chain = connection.chain;
    return connection;
  }

  /**
   * Creates a valid EIP-1193 provider.
   */
  protected abstract createProvider(options?: Options): Promise<Provider>;

  /**
   * Connects the provider.
   * Should returns an object with:
   * - provider: A valid EIP-1193 provider
   * - chainId(optional): the chainId that has been connected to
   * - account(optional): the address that is connected to the provider
   */
  protected abstract createConnection(options?: Options): Promise<EvmConnection>;

  protected async getProvider(options?: Options): Promise<Provider> {
    if (!this._provider) {
      this._provider = await this.createProvider(options);
      this.subscribeToEvents(this._provider);
    }
    return this._provider;
  }

  private subscribeToEvents(provider: Provider) {
    provider.on(EvmProviderEvent.CHAIN_CHANGED, this.handleChainChanged);
    provider.on(EvmProviderEvent.ACCOUNTS_CHANGED, this.handleAccountsChanged);
    provider.on(EvmProviderEvent.CONNECT, this.handleConnect);
    provider.on(EvmProviderEvent.DISCONNECT, this.handleDisconnect);
  }

  // unsubscribeToEvents(provider: EvmProvider) {
  //   provider.removeListener(EvmProviderEvent.CHAIN_CHANGED, this.handleChainChanged);
  //   provider.removeListener(EvmProviderEvent.ACCOUNTS_CHANGED, this.handleAccountsChanged);
  //   provider.removeListener(EvmProviderEvent.CONNECT, this.handleConnect);
  //   provider.removeListener(EvmProviderEvent.DISCONNECT, this.handleDisconnect);
  // }

  /**
   * Updates account and emit event, on EIP-1193 accountsChanged events
   */
  private handleAccountsChanged(accounts: ProviderAccounts) {
    if (accounts.length === 0) {
      return;
    }

    this._account = EvmAddress.create(accounts[0]);
    this.emit(EvmConnectorEvent.ACCOUNT_CHANGED, this.account);
  }

  /**
   * Updates chainId and emit event, on EIP-1193 accountsChanged events
   */
  private handleChainChanged(chain: ProviderChainId) {
    const newChain = EvmChain.create(chain);
    this._chain = newChain;
    this.emit(EvmConnectorEvent.CHAIN_CHANGED, newChain);
  }

  private handleConnect(providerInfo: ProviderInfo) {
    this.emit(EvmConnectorEvent.CONNECT, providerInfo);
  }

  private handleDisconnect(error: ProviderRpcError) {
    this.emit(EvmConnectorEvent.DISCONNECT, error);
  }

  async cancelRequest(): Promise<void> {
    throw new MoralisNetworkConnectorError({
      code: NetworkConnectorErrorCode.NOT_IMPLEMENTED,
      message: 'cancelRequest() is not implemented',
    });
  }

  // /**
  //  * Cleans all active listners, connections and stale references
  //  */
  // async deactivate() {
  //   if (this.provider) {
  //     this.unsubscribeToEvents(this.provider);
  //   }

  //   this.account = null;
  //   this.chain = null;
  //   this._provider = null;
  // }
}

export interface ConnectorFactory {
  create(core: MoralisCore): EvmAbstractConnector;
}
