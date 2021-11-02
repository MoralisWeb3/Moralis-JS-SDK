/* global window */
import Web3 from 'web3';

const WARNING = 'Non ethereum enabled browser';

async function getWeb3FromBrowser() {
  const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;

  // const provider = window.web3?.currentProvider;
  const { ethereum } = window;
  const provider = ethereum;

  if (provider?.isTrust) {
    return new MWeb3(provider);
  }

  if (ethereum) {
    const web3 = new MWeb3(ethereum);
    await ethereum.request({
      method: 'eth_requestAccounts',
    });
    return web3;
  }
  if (provider) {
    return new MWeb3(provider);
  }
  throw new Error(WARNING);
}

class MoralisInjectedProvider {
  get type() {
    return 'injected';
  }

  async activate() {
    this.web3 = await getWeb3FromBrowser();
    this.isActivated = true;

    return this.web3;
  }

  async deactivate() {
    this.isActivated = false;
    this.web3 = null;
  }
}

export default MoralisInjectedProvider;
