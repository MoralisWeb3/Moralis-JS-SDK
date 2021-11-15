/* global window */
import Web3 from 'web3';

const MORALIS_RPCS = {
  1: `https://speedy-nodes-nyc.moralis.io/WalletConnect/eth/mainnet`,
  3: `https://speedy-nodes-nyc.moralis.io/WalletConnect/eth/ropsten`,
  4: `https://speedy-nodes-nyc.moralis.io/WalletConnect/eth/rinkeby`,
  5: `https://speedy-nodes-nyc.moralis.io/WalletConnect/eth/goerli`,
  42: `https://speedy-nodes-nyc.moralis.io/WalletConnect/eth/kovan`,
  137: `https://speedy-nodes-nyc.moralis.io/WalletConnect/polygon/mainnet`,
  80001: `https://speedy-nodes-nyc.moralis.io/WalletConnect/polygon/mumbai`,
  56: `https://speedy-nodes-nyc.moralis.io/WalletConnect/bsc/mainnet`,
  97: `https://speedy-nodes-nyc.moralis.io/WalletConnect/bsc/testnet`,
  43114: `https://speedy-nodes-nyc.moralis.io/WalletConnect/avalanche/mainnet`,
  250: `https://speedy-nodes-nyc.moralis.io/WalletConnect/fantom/mainnet`,
};

class MoralisWalletConnectProvider {
  get type() {
    return 'WalletConnect';
  }

  async activate(options = {}) {
    if (!this.provider) {
      let WalletConnectProvider;

      try {
        WalletConnectProvider = require('@walletconnect/web3-provider');
      } catch (error) {
        // Do nothing. User might not need walletconnect
      }

      if (typeof WalletConnectProvider.default === 'function') {
        this.provider = new WalletConnectProvider.default({
          rpc: MORALIS_RPCS,
          chainId: options.chainId,
          qrcodeModalOptions: {
            mobileLinks: options.mobileLinks,
          },
        });
      } else {
        this.provider = new window.WalletConnectProvider.default({
          rpc: MORALIS_RPCS,
          chainId: options.chainId,
          qrcodeModalOptions: {
            mobileLinks: options.mobileLinks,
          },
        });
      }
    }

    await this.provider.enable();

    const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
    this.web3 = new MWeb3(this.provider);
    this.isActivated = true;

    return this.web3;
  }

  static cleanupStaleData() {
    if (window) {
      try {
        window.localStorage.removeItem('walletconnect');
      } catch (error) {
        // Do nothing, might happen in react-native environment
      }
    }
  }

  async deactivate() {
    this.isActivated = false;
    this.web3 = null;

    if (this.provider) {
      try {
        await this.provider.close();
      } catch {
        // Do nothing, might throw error if connection was not opened
      }
    }

    MoralisWalletConnectProvider.cleanupStaleData();

    this.provider = null;
  }
}

export default MoralisWalletConnectProvider;
