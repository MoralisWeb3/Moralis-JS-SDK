import EventEmitter from 'eventemitter3';
import { EvmConnectorEvent } from '@moralis/evm-connector-utils/src/events';
import {
  EvmAddress,
  EvmBaseConnectOptions,
  EvmChain,
  EvmConnectResponse,
  EvmProvider,
  EvmProviderEvent,
  MoralisNetworkConnectorError,
  NetworkConnectorErrorCode,
  ProviderAccounts,
  ProviderChainId,
  ProviderInfo,
  ProviderRpcError,
  Logger,
  MoralisCore,
} from '@moralis/core';

interface AbstractConnectorConfig {
  name: string;
  core: MoralisCore;
}

// TODO: add eventListeners typesafe to this class (onAccountChange etc.)
// TODO: make this an abstract class and implement it?
/**
 * Abstract connector to connect EIP-1193 providers to Moralis
 *
 * It should implement at least:
 * - connect()
 * - Emit ConnectorEvent.CHAIN_CHANGED when the chain has changed (if possible)
 * - Emit ConnectorEvent.ACCOUNT_CHANGED when the account has changed (if possible)
 * - name: a name to identify
 * - network: the network type that is used (eg. 'evm')
 */
export class EvmAbstractConnector extends EventEmitter {
  name: string;
  core: MoralisCore;
  logger: Logger;
  network = 'evm';

  account: EvmAddress | null = null;
  chain: EvmChain | null = null;

  isSubscribedToEvents = false;
  // Provider can be a different type (provided by the library, than the basic EvmProvider that we use)
  // To get the EvmProvider, use the `provider` getter
  _provider: unknown | null = null;

  // TODO: find better solution for duplication of this._provider and this.provider, the main issue is that providers as Walletconnect are an EvmProvider, but not typed as one (as WalletconnecProvider does not extend the EvmProvider)
  // TODO: ... maybe a generic type might help
  get provider(): EvmProvider | null {
    if (!this._provider) {
      return null;
    }
    return this._provider as unknown as EvmProvider;
  }

  constructor({ name, core }: AbstractConnectorConfig) {
    super();
    this.name = name;
    this.core = core;
    this.logger = new Logger(core, `evmConnector: ${this.name}`);

    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  subscribeToEvents(provider: EvmProvider) {
    if (this.isSubscribedToEvents) {
      return;
    }
    provider.on(EvmProviderEvent.CHAIN_CHANGED, this.handleChainChanged);
    provider.on(EvmProviderEvent.ACCOUNTS_CHANGED, this.handleAccountsChanged);
    provider.on(EvmProviderEvent.CONNECT, this.handleConnect);
    provider.on(EvmProviderEvent.DISCONNECT, this.handleDisconnect);
    this.isSubscribedToEvents = true;
  }

  // unsubscribeToEvents(provider: EvmProvider) {
  //   provider.removeListener(EvmProviderEvent.CHAIN_CHANGED, this.handleChainChanged);
  //   provider.removeListener(EvmProviderEvent.ACCOUNTS_CHANGED, this.handleAccountsChanged);
  //   provider.removeListener(EvmProviderEvent.CONNECT, this.handleConnect);
  //   provider.removeListener(EvmProviderEvent.DISCONNECT, this.handleDisconnect);
  // }

  /**
   * Connects the provider.
   * Should returns an object with:
   * - provider: A valid EIP-1193 provider
   * - chainId(optional): the chainId that has been connected to (in hex format)
   * - account(optional): the address that is connected to the provider
   */
  async connect(options?: EvmBaseConnectOptions): Promise<EvmConnectResponse> {
    throw new MoralisNetworkConnectorError({
      code: NetworkConnectorErrorCode.NOT_IMPLEMENTED,
      message: 'connect() is not implemented',
    });
  }

  /**
   * Updates account and emit event, on EIP-1193 accountsChanged events
   */
  handleAccountsChanged(accounts: ProviderAccounts) {
    if (accounts.length === 0) {
      // TODO: handle edge case by disconnecting
      return;
    }

    this.account = new EvmAddress(accounts[0]);
    this.emit(EvmConnectorEvent.ACCOUNT_CHANGED, this.account);
  }

  /**
   * Updates chainId and emit event, on EIP-1193 accountsChanged events
   */
  handleChainChanged(chain: ProviderChainId) {
    const newChain = new EvmChain(chain);
    this.chain = newChain;
    this.emit(EvmConnectorEvent.CHAIN_CHANGED, newChain);
  }

  handleConnect(providerInfo: ProviderInfo) {
    this.emit(EvmConnectorEvent.CONNECT, providerInfo);
  }

  handleDisconnect(error: ProviderRpcError) {
    this.emit(EvmConnectorEvent.DISCONNECT, error);
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
