/* global window */
import Web3 from 'web3';

const ERROR_CHAINID_MISSING =
  'Missing chainId. Check available chain and corresponding IDs: https://chainlist.org/';

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
    43114: `https://speedy-nodes-nyc.moralis.io/${speedyNodeKey}/avalanche/mainnet`,
  };
};

class MoralisCustomProvider {
  get type() {
    return 'CustomProvider';
  }

  async activate(options) {
    const { speedyNodeApiKey, chainId } = options;
    if (!chainId) throw new Error(ERROR_CHAINID_MISSING);

    const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;

    const web3Provider = new MWeb3.providers.HttpProvider(
      this.getUrl(chainId, speedyNodeApiKey),
      options
    );

    this.web3 = new MWeb3(web3Provider);
    this.isActivated = true;

    return this.web3;
  }

  async deactivate() {
    this.isActivated = false;
    this.web3 = null;
  }

  getUrl(chainId, speedyNodeKey) {
    return MORALIS_RPCS(speedyNodeKey)[chainId];
  }
}

export default MoralisCustomProvider;
