import { ethers } from 'ethers';
import core, { EvmTransactionInput } from '@moralisweb3/core';
import { NetworkModule, EvmConnect } from '@moralisweb3/core';
import { MODULE_NAME } from './config';
import { EvmNetworkEvent, EvmNetworkEventMap } from './events/EvmNetworkEvent';
import { makeSendTransaction } from './chainMethods/sendTransaction';
import { makeSignMessage } from './chainMethods/signMessage';
import { makeTransferNative, TransferNativeOptions } from './chainMethods/transferNative';
import { makeTransferErc20, TransferErc20Options } from './chainMethods/transferErc20';
import { makeTransferErc721, TransferErc721Options } from './chainMethods/transferErc721';
import { Connection } from './Connection/Connection';
import { makeTransferErc1155, TransferErc1155Options } from './chainMethods/transferErc1155';
import { EcecuteFunctionOptions, makeExecutefunction } from './chainMethods/executeFunction';

export class MoralisEvm extends NetworkModule<EvmNetworkEventMap> {
  connection: Connection = new Connection(this.logger, this.emitter);

  constructor() {
    super({
      name: MODULE_NAME,
      core,
    });
  }

  /**
   * Event listeners
   */

  onConnecting = (fn: EvmNetworkEventMap['Connecting']) => this.listen(EvmNetworkEvent.CONNECTING, fn);
  onConnected = (fn: EvmNetworkEventMap['Connected']) => this.listen(EvmNetworkEvent.CONNECTED, fn);
  onDisconnected = (fn: EvmNetworkEventMap['Disconnected']) => this.listen(EvmNetworkEvent.DISCONNECTED, fn);
  onConnectingError = (fn: EvmNetworkEventMap['ConnectingError']) => this.listen(EvmNetworkEvent.CONNECTING_ERROR, fn);
  onAccountChanged = (fn: EvmNetworkEventMap['AccountChanged']) => this.listen(EvmNetworkEvent.ACCOUNT_CHANGED, fn);
  onChainChanged = (fn: EvmNetworkEventMap['ChainChanged']) => this.listen(EvmNetworkEvent.CHAIN_CHANGED, fn);
  onProviderUpdated = (fn: EvmNetworkEventMap['ProviderUpdated']) => this.listen(EvmNetworkEvent.PROVIDER_UPDATED, fn);

  /**
   * General
   */

  get web3Library() {
    return ethers;
  }

  /**
   * Connection getters
   */

  /**
   * Get all available connectors
   */
  get connectors() {
    return this.connection.connectors;
  }

  /**
   * Get all names of available connectors
   */
  get supportedConnectors() {
    return this.connection.connectors.names;
  }

  /**
   * Return the connected connector
   */
  get connector() {
    return this.connection.connector;
  }

  get provider() {
    return this.connection.provider;
  }

  get hasProvider() {
    return this.connection.hasProvider;
  }

  get chain() {
    return this.connection.chain;
  }

  get account() {
    return this.connection.account;
  }

  get isConnected() {
    return this.connection.isConnected;
  }

  get isConnecting() {
    return this.connection.isConnecting;
  }

  /**
   * Connection methods
   */

  connect: EvmConnect = async (connector, options) => {
    return this.connection.connect(connector, options);
  };

  disconnect = () => {
    return this.connection.disconnect();
  };

  cancelRequest = () => {
    return this.connection.cancleRequest();
  };

  /**
   * Chain Methods
   */

  signMessage = (message: string) => makeSignMessage(this.provider)(message);
  sendTransaction = (data: EvmTransactionInput) => makeSendTransaction(this.provider, this.chain)(data);
  transferNative = (data: TransferNativeOptions) => makeTransferNative(this.sendTransaction, this.chain)(data);
  transferErc20 = (data: TransferErc20Options) => makeTransferErc20(this.provider, this.chain)(data);
  transferErc721 = (data: TransferErc721Options) => makeTransferErc721(this.provider, this.account, this.chain)(data);
  transferErc1155 = (data: TransferErc1155Options) =>
    makeTransferErc1155(this.provider, this.account, this.chain)(data);
  executeFunction = (data: EcecuteFunctionOptions) => makeExecutefunction(this.provider)(data);
}

const moralisEvm = new MoralisEvm();
export default moralisEvm;
