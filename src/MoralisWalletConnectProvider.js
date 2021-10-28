/* global window */
import Web3 from 'web3';
import axios from 'axios';

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
      const { moralisSecret } = options;
      let WalletConnectProvider;
      let speedyNodeKey = 'WalletConnect';

      try {
        WalletConnectProvider = require('@walletconnect/web3-provider');
      } catch (error) {
        throw new Error(error);
        // Do nothing. User might not need walletconnect
      }

      if (moralisSecret) {
        try {
          const response = await axios.get(
            'https://moralis-secret.stage.moralis.io/api/publics/apiKeys',
            {
              headers: {
                'moralis-secret':
                  'hfpcjh6KKV2R8eyfVmeMIlPLRMK4vZ2aErwcD7dnNcUxLCKSTEQvmu1cfz0thfz0',
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
          const { speedyNodeApiKey } = response.data.result;
          speedyNodeKey = speedyNodeApiKey;
        } catch (error) {
          throw new Error(error);
        }
      }

      if (typeof WalletConnectProvider.default === 'function') {
        this.provider = new WalletConnectProvider.default({
          rpc: MORALIS_RPCS(speedyNodeKey),
          chainId: options.chainId,
          qrcodeModalOptions: {
            mobileLinks: options.mobileLinks,
          },
        });
      } else {
        this.provider = new window.WalletConnectProvider.default({
          rpc: MORALIS_RPCS(speedyNodeKey),
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
