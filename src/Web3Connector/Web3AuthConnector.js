import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

export class Web3AuthConnector extends AbstractWeb3Connector {
  type = 'Web3AuthConnector';

  activate = async () => {
    const Web3Auth = require('@web3auth/web3auth')?.Web3Auth;
    const CHAIN_NAMESPACES = require('@web3auth/base')?.CHAIN_NAMESPACES;
    const ADAPTER_STATUS = require('@web3auth/base')?.ADAPTER_STATUS;
    const ethChainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: '0x3',
      rpcTarget: `https://ropsten.infura.io/v3/0e902584ce904829b734b788fb6635f0`,
      displayName: 'ropsten',
      blockExplorer: 'https://ropsten.etherscan.io/',
      ticker: 'ETH',
      tickerName: 'Ethereum',
    };
    const web3auth = new Web3Auth({
      chainConfig: ethChainConfig,
      clientId:
        'BIvj6MhR9IDRhr6l0eTu9-7f-Vv_9r9E23TU6eB27G2ti74lp_0NB1x2sQa3KjyLGsj-415IjGMRpm3EGL0pjCQ',
    });
    await web3auth.initModal();
    web3auth?.connect();
    const autheticated = async () => {
      return new Promise((resolve, reject) => {
        web3auth.on(ADAPTER_STATUS.CONNECTED, async data => {
          const ether = new ethers.providers.Web3Provider(web3auth.provider);
          const signer = ether.getSigner();
          const { chainId } = await ether.getNetwork();
          const address = (await signer.getAddress()).toLowerCase();
          resolve({
            provider: { ...web3auth.provider },
            account: address,
            chainId: '0x3',
          });
        });
        web3auth.on(ADAPTER_STATUS.ERRORED, error => {
          reject(error);
        });
      });
    };
    const userAuth = await autheticated();
    this.account = userAuth.account;
    this.chainId = userAuth.chainId;
    this.provider = userAuth.provider;
    this.subscribeToEvents(this.provider);
    this.web3Instance = web3auth;
    return {
      chainId: this.chainId,
      account: this.account,
      provider: this.provider,
    };
  };

  deactivate = async () => {
    this.unsubscribeToEvents(this.provider);
    if (this.web3Instance) {
      await this.web3Instance.logout();
    }
    this.account = null;
    this.chainId = null;
  };
}
