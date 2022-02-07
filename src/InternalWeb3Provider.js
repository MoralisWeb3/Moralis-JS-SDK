import EventEmitter from 'events';
import { ConnectorEvents } from './Web3Connector/events';
import { ethers } from 'ethers';
import { fromHexToDecimal } from './utils/convert';

// Events emitted by Moralis
export const InternalWeb3Events = Object.freeze({
  ACCOUNT_CHANGED: 'accountChanged',
  CHAIN_CHANGED: 'chainChanged',
  PROVIDER_CONNECT: 'provider-connect',
  PROVIDER_DISCONNECT: 'provider-disconnect',
  WEB3_ENABLED: 'web3Enabled',
  WEB3_DEACTIVATED: 'web3Deactivated',
});

/**
 * Wrapper for the internal web3 provider,
 * responsible for syncing data when connector connects/deactivates
 * Gives access to ethers functionalities, initialized by the connector
 */
class InternalWeb3Provider extends EventEmitter {
  constructor(connector, anyNetwork = false) {
    super();

    if (!connector) {
      throw new Error('Cannot initialize InternalWeb3Provider without a connector');
    }

    this.connector = connector;
    this.anyNetwork = anyNetwork;

    this.handleAccountChanged = this.handleAccountChanged.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  async activate(options) {
    if (!this.connector) {
      throw new Error('Cannot acticate InternalWeb3Provider without a connector');
    }

    const { provider, chainId, account } = await this.connector.activate(options);

    this.provider = provider;
    this.chainId = chainId;
    this.account = account;

    const network = this.anyNetwork ? 'any' : fromHexToDecimal(chainId);
    this.web3 = new ethers.providers.Web3Provider(provider, network);

    if (this.connector.on) {
      this.connector.on(ConnectorEvents.ACCOUNT_CHANGED, this.handleAccountChanged);
      this.connector.on(ConnectorEvents.CHAIN_CHANGED, this.handleChainChanged);
      this.connector.on(ConnectorEvents.CONNECT, this.handleConnect);
      this.connector.on(ConnectorEvents.DISCONNECT, this.handleDisconnect);
    }

    return { provider, chainId, account, web3: this.web3 };
  }

  // Returns a provider that can sign messages (throws if not possible, ie. the account cannot sign)
  get signer() {
    return this.web3.getSigner(this.account);
  }

  // Returns a provider that can sign messages or the normal web3 provider as fallback
  get signerOrProvider() {
    try {
      if (this.account) {
        return this.web3.getSigner(this.account);
      }
      return this.web3;
    } catch (error) {
      return this.web3;
    }
  }

  handleChainChanged(chainId) {
    this.chainId = chainId;
    this.web3 = new ethers.providers.Web3Provider(this.provider, fromHexToDecimal(chainId));
    this.emit(InternalWeb3Events.CHAIN_CHANGED, chainId);
  }

  handleAccountChanged(account) {
    this.account = account;
    this.emit(InternalWeb3Events.ACCOUNT_CHANGED, account);
  }

  // Handle Connect events fired from connectors
  handleConnect(connectInfo) {
    this.emit(InternalWeb3Events.PROVIDER_CONNECT, connectInfo);
  }

  // Handle Disconnect events fired from connectors
  handleDisconnect(error) {
    this.emit(InternalWeb3Events.PROVIDER_DISCONNECT, error);
  }

  async deactivate() {
    this.account = null;
    this.chianId = null;
    this.web3 = null;
    this.provider = null;

    if (this.connector) {
      if (this.connector.removeListener) {
        this.connector.removeListener(InternalWeb3Events.CHAIN_CHANGED, this.handleChainChanged);
        this.connector.removeListener(
          InternalWeb3Events.ACCOUNT_CHANGED,
          this.handleAccountChanged
        );
        this.connector.removeListener(InternalWeb3Events.PROVIDER_CONNECT, this.handleConnect);
        this.connector.removeListener(
          InternalWeb3Events.PROVIDER_DISCONNECT,
          this.handleDisconnect
        );
      }

      if (this.connector.deactivate) {
        await this.connector.deactivate();
      }
    }

    this.connector = null;
  }
}

export default InternalWeb3Provider;
