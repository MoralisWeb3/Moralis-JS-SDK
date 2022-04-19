import { interpret } from 'xstate';
import { providers } from 'ethers';
import {
  AnyConnector,
  BaseNetworkClass,
  EvmConnectData,
  EvmConnectOptions,
  EvmConnectorName,
  MoralisNetworkError,
  NetworkErrorCode,
} from '@moralis/core';
import core from '@moralis/core';
import { ConnectEvent, stateMachine } from './State/stateMachine';
import { EvmAbstractConnector } from '@moralis/evm-connector-utils';
import {
  EvmNetworkEvent,
  OnAccountChangedCallback,
  OnChainChangedCallback,
  OnConnectedCallback,
  OnConnectingCallback,
  OnConnectingErrorCallback,
  OnDisconnectedCallback,
} from './events';
import { makePromiseFromCallbackInvoker } from './utils';
import { createConnectEvmCallback } from './Connect/EvmConnector';

// TODO: allow metamask cancelation -> ConnectingError
// TODO: implement force new session
// TODO add AnyConnector type?
// TODO: make emit typesafe
export class MoralisEvm extends BaseNetworkClass {
  stateMachine;
  stateService;
  connector: EvmAbstractConnector | null = null;
  // TODO: or rename this web3? If we keep it 'provider' than we need better differntiation between this provider and connector-'providers'
  // TODO: Make this a JSON signer? Is that always possible???
  // TODO Maybe ALL EVM connectors should return a Provider that is compatible with EThers / have exact same interface
  provider: providers.Web3Provider | null = null;

  constructor() {
    super({
      name: 'evm',
      core,
    });
    this.stateMachine = stateMachine.withConfig({
      services: {
        connectInvoker: (context, event) => createConnectEvmCallback(event, this.logger),
      },
      actions: {
        onConnectSuccess: (context, event) =>
          this.handleConnectSuccess({
            chain: event.data.chain,
            account: event.data.account,
            provider: event.data.provider,
            connector: event.data.connector,
          }),
        onConnectError: (context, event) => this.handleConnectingError(event.data),
        onConnecting: (context, event) => this.handleConnecting(event.walletType),
        onDisconnected: (context, event) => this.handleDisconnect(),
      },
    });
    this.stateService = interpret(this.stateMachine).start();
  }

  start(): void | Promise<void> {
    // TODO: Eager connect?
  }

  // Add event listeners
  onConnecting = (listener: OnConnectingCallback) => this.listen(EvmNetworkEvent.CONNECTING, listener);
  onConnected = (listener: OnConnectedCallback) => this.listen(EvmNetworkEvent.CONNECTED, listener);
  onDisconected = (listener: OnDisconnectedCallback) => this.listen(EvmNetworkEvent.DISCONNECTED, listener);
  onConnectingError = (listener: OnConnectingErrorCallback) => this.listen(EvmNetworkEvent.CONNECTING_ERROR, listener);
  onAccountChanged = (listener: OnAccountChangedCallback) => this.listen(EvmNetworkEvent.ACCOUNT_CHANGED, listener);
  onChainChanged = (listener: OnChainChangedCallback) => this.listen(EvmNetworkEvent.CHAIN_CHANGED, listener);

  // Getters
  get chain() {
    return this.connector?.chain ?? null;
  }

  get account() {
    return this.connector?.account ?? null;
  }

  // get provider() {
  //   return this.connector?.provider ?? null;
  // }

  get isConnected() {
    return this.stateService.state.matches('Connected');
  }

  get isConnecting() {
    return this.stateService.state.matches('Connecting');
  }

  // TODO: add getters to check current state/canXXX

  private static _getConnectOptions(connectOptions: EvmConnectOptions): ConnectEvent {
    return {
      type: 'CONNECT',
      ...connectOptions,
    } as const;
  }

  /**
   * Checks if it is possible to connect with the provided connectOptions
   * This depends on the current state of the stateMachine
   */
  private _canConnect(connectOptions: EvmConnectOptions) {
    const connectStateOptions = MoralisEvm._getConnectOptions(connectOptions);

    return this.stateService.state.can(connectStateOptions);
  }

  /**
   * Validates if we can connect with the provided walletType.
   * Throws an error if this is nor possible
   */
  private _validateCanConnect(connectOptions: EvmConnectOptions) {
    if (this._canConnect(connectOptions)) {
      return;
    }

    if (this.isConnecting) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot connect, another connection request is still pending',
      });
    }

    throw new MoralisNetworkError({ code: NetworkErrorCode.CANNOT_CONNECT, message: 'Cannot connect' });
  }

  /**
   * Triggers a state-change to CONNECTING and triggering the connectInvoker to resolve the state
   * into an error or success. This function only triggers the state change. To listen for a success or error, you
   * would need to
   */
  private _startConnect(connectOptions: EvmConnectOptions) {
    const connectStateOptions = MoralisEvm._getConnectOptions(connectOptions);

    this.stateService.send(connectStateOptions);
  }

  // TODO: add timeout mechanic? If so we need to cancel Metamask/Walletconnect etc. request as well
  // TODO: abstract xstate logic
  // TODO: metamask connection cancel should reset state to DISCONNECTED
  // TODO: make optional, and use defaultEvmConnector (but keep typesafe???)

  /**
   * Gets the web3 provider, or throws an error if not present
   */
  getProvider() {
    if (!this.provider) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.NO_PROVIDER,
        message: 'No provider found, make sure to connect first',
      });
    }

    return this.provider;
  }

  getSigner() {
    const provider = this.getProvider();

    if (!this.account) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.NO_ACCOUNT,
        message: `You're not connected with an account. So this provider cannot be used to sign messages/transactions`,
      });
    }

    return provider.getSigner(this.account.lowercase);
  }

  signMessage = async (message: string) => {
    const signer = this.getSigner();

    const signature = await signer.signMessage(message);

    return signature;
  };

  // Triggers

  /**
   * Validates if can be connected to onchain. If so trigger a connection.
   * And return a promise that resolves in a success response, or rejects into an error
   */
  connect = async (options: EvmConnectOptions) => {
    // Disconnect previous connection
    if (this.isConnected) {
      await this.disconnect();
    }

    this._validateCanConnect(options);
    this._startConnect(options);

    return makePromiseFromCallbackInvoker(this.onConnected, this.onConnectingError);
  };

  /**
   * Trigger a disconnect
   */
  disconnect = () => {
    this.stateService.send({ type: 'DISCONNECT' });
  };

  // State change handlers

  private handleDisconnect = () => {
    this.logger.verbose('Disconnected');

    this.connector = null;
    this.provider = null;

    this.emit(EvmNetworkEvent.DISCONNECTED);
  };

  private handleConnecting = (walletType: EvmConnectorName) => {
    this.logger.verbose(`Connecting using ${walletType}`);
    this.emit(EvmNetworkEvent.CONNECTING);
  };

  private handleConnectingError = (error: Error) => {
    this.logger.verbose('Connecting error', { error });

    this.emit(EvmNetworkEvent.CONNECTING_ERROR, { error });

    throw new MoralisNetworkError({
      code: NetworkErrorCode.CANNOT_CONNECT,
      message: `Connection failed: ${error.name}: ${error.message}`,
      cause: error,
    });
  };

  private handleConnectSuccess = (data: EvmConnectData<AnyConnector>) => {
    this.logger.verbose('handleConnectSuccess called', { data });

    this.connector = data.connector;
    this.provider = new providers.Web3Provider(data.provider);

    this.emit(EvmNetworkEvent.CONNECTED, data);
  };

  // TODO: export getter to get all chains?
}

const moralisEvm = new MoralisEvm();
export default moralisEvm;
