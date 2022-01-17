/* global window */
import verifyChainId from '../utils/verifyChainId';
import AbstractWeb3Connector from './AbstractWeb3Connector';
import { ConnectorEvents } from './events';
import { getMoralisRpcs } from './MoralisRpcs';

export const WalletConnectEvent = Object.freeze({
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  DISCONNECT: 'disconnect',
});

/**
 * Connector to connect an WalletConenct provider to Moralis
 * Note: this assumes using WalletConnect v1
 * // TODO: support WalletConnect v2
 */
class WalletConnectWeb3Connector extends AbstractWeb3Connector {
  type = 'WalletConnect';

  async activate({ chainId: providedChainId, mobileLinks } = {}) {
    // Cleanup old data if present to avoid using previous sessions
    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }

    if (!this.provider) {
      let WalletConnectProvider;
      const config = {
        rpc: getMoralisRpcs('WalletConnect'),
        chainId: providedChainId,
        qrcodeModalOptions: {
          mobileLinks,
        },
      };

      try {
        WalletConnectProvider = require('@walletconnect/web3-provider')?.default;
      } catch (error) {
        // Do nothing. User might not need walletconnect
      }

      if (!WalletConnectProvider) {
        throw new Error(
          'Cannot enable WalletConnect: dependency "@walletconnect/web3-provider" is missing'
        );
      }

      if (typeof WalletConnectProvider === 'function') {
        this.provider = new WalletConnectProvider(config);
      } else {
        this.provider = new window.WalletConnectProvider(config);
      }
    }

    if (!this.provider) {
      throw new Error('Could not connect with WalletConnect, error in connecting to provider');
    }

    const accounts = await this.provider.enable();
    const account = accounts[0].toLowerCase();
    const { chainId } = this.provider;
    const verifiedChainId = verifyChainId(chainId);

    this.account = account;
    this.chainId = verifiedChainId;

    this.subscribeToEvents(this.provider);

    return { provider: this.provider, account, chainId: verifiedChainId };
  }

  async deactivate() {
    this.unsubscribeToEvents(this.provider);

    try {
      if (window) {
        window.localStorage.removeItem('walletconnect');
      }
    } catch (error) {
      // Do nothing
    }

    this.account = null;
    this.chainId = null;

    if (this.provider) {
      try {
        await this.provider.disconnect();
      } catch {
        // Do nothing
      }
    }
  }
}

export default WalletConnectWeb3Connector;
