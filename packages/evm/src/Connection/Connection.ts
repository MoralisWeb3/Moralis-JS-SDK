import { providers } from 'ethers';
import TypedEmitter from 'typed-emitter';
import {
  EvmAddress,
  EvmChain,
  EvmConnect,
  EvmConnectionData,
  EvmProvider,
  LoggerController,
  MoralisNetworkError,
  NetworkErrorCode,
  MoralisState,
} from '@moralisweb3/core';
import { EvmAbstractConnector, EvmConnectorEvent } from '@moralisweb3/evm-connector-utils';
import { EvmNetworkEvent, EvmNetworkEventMap } from '../events/EvmNetworkEvent';
import { connectWallet, cancelWalletRequest } from './walletConnection';
import { Connectors } from './Connectors';
import { StateContext, State, StateEvent } from './types';

export class Connection {
  private _logger;
  private _emitter;

  readonly connectors;

  // Provider that is returned from a connection to a connector (is used to establish the provider via _updateProvider())
  private _internalProvider: EvmProvider | null = null;
  // EthersJs provider, used to make chain interactions
  private _provider: providers.Web3Provider | null = null;
  // Used connector for the currect connection
  connector: EvmAbstractConnector | null = null;

  private readonly state = new MoralisState<StateContext, StateEvent, State>('Connection');

  constructor(logger: LoggerController, emitter: TypedEmitter<EvmNetworkEventMap>) {
    this.connectors = Connectors.create();
    this._logger = logger;
    this._emitter = emitter;

    this.state.start({
      initial: 'Disconnected',
      states: {
        Disconnected: {
          entry: this.handleDisconnected,
          on: {
            CONNECT: {
              target: 'Connecting',
            },
          },
        },
        Connecting: {
          entry: this.handleConnecting,
          on: {
            CONNECT_SUCCESS: {
              target: 'Connected',
            },
            CONNECT_ERROR: {
              target: 'Disconnected',
            },
          },
        },
        Connected: {
          entry: this.handleConnected,
          on: {
            DISCONNECT: {
              target: 'Disconnected',
            },
          },
        },
      },
    });
  }

  private _handleAccountChange = (account: EvmAddress) => {
    this._logger.verbose('Chain changed', { account });
    this._emitter.emit(EvmNetworkEvent.ACCOUNT_CHANGED, { account });
  };

  private _handleChainChange = (chain: EvmChain) => {
    this._logger.verbose('Chain changed', { chain });
    this._emitter.emit(EvmNetworkEvent.CHAIN_CHANGED, { chain });

    this._updateProvider();
  };

  /**
   * Updates the ._provider (and therefore .provider) instance, based on the
   * _internalProvider, that is retreived from a connector, and the provided chain.
   * We need to reset this provider every time a chain chainges, as recommended by ethersJs,
   * for user protection.
   */
  private _updateProvider() {
    // No need to update if we have no internalProvider set
    if (!this._internalProvider) {
      this._provider = null;
      return;
    }

    // No need to change provider if we have not chain set
    if (!this.chain) {
      return;
    }

    const newProvider = new providers.Web3Provider(this._internalProvider, this.chain?.decimal);
    this._provider = newProvider;
    this._logger.verbose('Provider updated', { provider: newProvider });

    this._emitter.emit(EvmNetworkEvent.PROVIDER_UPDATED, { provider: this.provider });
  }

  /**
   * State change handlers
   */

  private handleDisconnected = (context: StateContext, event: StateEvent) => {
    if (event.type === 'xstate.init') {
      // Don't do anything initially, as we start in disconnected state
      return;
    }

    this._internalProvider = null;
    this._updateProvider();

    if (this.connector) {
      this.connector.off(EvmConnectorEvent.ACCOUNT_CHANGED, this._handleAccountChange);
      this.connector.off(EvmConnectorEvent.CHAIN_CHANGED, this._handleChainChange);
      this.connector = null;
    }

    this._logger.verbose('Disconnected', { context, event });
    this._emitter.emit(EvmNetworkEvent.DISCONNECTED);

    if (event.type === 'CONNECT_ERROR') {
      const error = event.data;

      this._emitter.emit(EvmNetworkEvent.CONNECTING_ERROR, error);

      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: `Connection failed: ${error.name}: ${error.message}`,
        cause: error,
      });
    }
  };

  /**
   * Connect to the Evm chain vased on the provided wallet and its options.
   * Will trigger a CONNECT_SUCCESS event on success or CONNECT_ERROR event on error
   */
  private handleConnecting = (context: StateContext, event: StateEvent) => {
    this._logger.verbose('Connecting', { context, event });

    // Should only call connecting via the CONNECT event
    if (event.type !== 'CONNECT') {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot connect, connection triggered incorrectly.',
      });
    }

    const { connector, options } = event.data;

    this._emitter.emit(EvmNetworkEvent.CONNECTING);

    connectWallet(this.connectors, connector, options ?? {})
      .then((data) => this.state.transition({ type: 'CONNECT_SUCCESS', data }))
      .catch((error: Error) => this.state.transition({ type: 'CONNECT_ERROR', data: error }));
  };

  private handleConnected = (context: StateContext, event: StateEvent) => {
    this._logger.verbose('Connected', { context, event });

    // Should only be connected successfully via the CONNECT_SUCCESS event
    if (event.type !== 'CONNECT_SUCCESS') {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Connected incorrectly.',
      });
    }

    const { connector, provider } = event.data;
    this.connector = connector;
    this._internalProvider = provider;
    this._updateProvider();

    connector.on(EvmConnectorEvent.ACCOUNT_CHANGED, this._handleAccountChange);
    connector.on(EvmConnectorEvent.CHAIN_CHANGED, this._handleChainChange);

    this._emitter.emit(EvmNetworkEvent.CONNECTED, event.data);
  };

  /**
   * Utilities
   */

  get isConnected() {
    return this.state.match('Connected');
  }

  get isConnecting() {
    return this.state.match('Connecting');
  }

  get canConnect() {
    return !this.isConnecting;
  }

  /**
   * Trigger state changes
   */

  connect: EvmConnect = async (connector, options) => {
    if (this.isConnecting) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot connect, as a connection attempt is already pending.',
      });
    }

    if (this.isConnected) {
      await this.disconnect();
    }

    if (!this.state.can('CONNECT')) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot connect.',
      });
    }

    this.state.transition({
      type: 'CONNECT',
      data: {
        connector,
        options,
      },
    });

    return new Promise((resolve, reject) => {
      const handleResolve = (data: EvmConnectionData<unknown>) => {
        resolve(data);
        this._emitter.off(EvmNetworkEvent.CONNECTED, handleResolve);
        this._emitter.off(EvmNetworkEvent.CONNECTING_ERROR, handleReject);
      };
      const handleReject = (error: Error) => {
        reject(error);
        this._emitter.off(EvmNetworkEvent.CONNECTED, handleResolve);
        this._emitter.off(EvmNetworkEvent.CONNECTING_ERROR, handleReject);
      };

      this._emitter.on(EvmNetworkEvent.CONNECTED, handleResolve);
      this._emitter.on(EvmNetworkEvent.CONNECTING_ERROR, handleReject);
    });
  };

  disconnect = async () => {
    if (this.isConnecting) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot disconnect, as a connection attempt is still pending',
      });
    }

    if (!this.state.can('DISCONNECT')) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CONNECT,
        message: 'Cannot disconnect',
      });
    }

    this.state.transition({ type: 'DISCONNECT' });
  };

  cancelRequest = async () => {
    if (!this.isConnecting) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.CANNOT_CANCEL,
        message: 'Cannot cancel request, as no connection attempt is pending',
      });
    }
    cancelWalletRequest(this.connector!)
      .then(() => {
        this.state.transition({
          type: 'CONNECT_ERROR',
          data: new MoralisNetworkError({
            code: NetworkErrorCode.CANNOT_CONNECT,
            message: 'Request cancelled',
          }),
        });
      })
      .catch(() => {
        throw new MoralisNetworkError({
          code: NetworkErrorCode.CANNOT_CANCEL,
          message: 'Cannot cancel request',
        });
      });
  };

  /**
   * Getters
   */

  get hasProvider() {
    return this._provider !== null;
  }

  get provider() {
    if (!this._provider) {
      return null;
    }

    return this._provider.getSigner(this.account?.lowercase);
  }

  get chain() {
    return this.connector?.chain ?? null;
  }

  get account() {
    return this.connector?.account ?? null;
  }
}
