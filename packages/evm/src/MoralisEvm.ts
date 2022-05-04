import { ethers } from 'ethers';
import core, { EvmTransactionInput } from '@moralis/core';
import { NetworkModule, EvmConnect } from '@moralis/core';
import { MODULE_NAME } from './config';
import { EvmNetworkEvent, EvmNetworkEventMap } from './events/EvmNetworkEvent';
import { makeSendTransaction } from './chainMethods/sendTransaction';
import { makeSignMessage } from './chainMethods/signMessage';
import { makeTransferNative, TransferNativeOptions } from './chainMethods/transferNative';
import { makeTransferErc20, TransferErc20Options } from './chainMethods/transferErc20';
import { Connection } from './Connection/Connection';

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

  get wallets() {
    return this.connection.wallets;
  }

  get supportedConnectors() {
    return this.connection.wallets.names;
  }

  get wallet() {
    return this.connection.wallet;
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

  connect: EvmConnect = async (wallet, options) => {
    return this.connection.connect(wallet, options);
  };

  disconnect = () => {
    return this.connection.disconnect();
  };

  /**
   * Chain Methods
   */

  signMessage = (message: string) => makeSignMessage(this.provider)(message);
  sendTransaction = (data: EvmTransactionInput) => makeSendTransaction(this.provider, this.chain)(data);
  transferNative = (data: TransferNativeOptions) => makeTransferNative(this.sendTransaction)(data);
  transferErc20 = (data: TransferErc20Options) => makeTransferErc20(this.provider, this.chain)(data);
}

const moralisEvm = new MoralisEvm();
export default moralisEvm;
