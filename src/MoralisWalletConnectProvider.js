/* global window */
import Web3 from 'web3';

const MORALIS_RPCS = speedyNodeKey => {
  return {
    1: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/mainnet`,
    3: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/ropsten`,
    4: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/rinkeby`,
    5: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/goerli`,
    42: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/eth/kovan`,
    137: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/polygon/mainnet`,
    80001: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/polygon/mumbai`,
    56: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/bsc/mainnet`,
    97: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/bsc/testnet`,
  };
};

class MoralisWalletConnectProvider {
  get type() {
    return 'WalletConnect';
  }

  async activate(options = {}) {
    if (!this.provider) {
      const { speedyNodeApiKey } = options;
      let WalletConnectProvider;

      try {
        WalletConnectProvider = require('@walletconnect/web3-provider');
      } catch (error) {
        throw new Error(error);
        // Do nothing. User might not need walletconnect
      }

      if (typeof WalletConnectProvider.default === 'function') {
        this.provider = new WalletConnectProvider.default({
          rpc: MORALIS_RPCS(speedyNodeApiKey),
          chainId: options.chainId,
          qrcodeModalOptions: {
            mobileLinks: options.mobileLinks,
          },
        });
      } else {
        this.provider = new window.WalletConnectProvider.default({
          rpc: MORALIS_RPCS(speedyNodeApiKey),
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
      window.localStorage.removeItem('walletconnect');
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
