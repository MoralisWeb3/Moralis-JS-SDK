import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

export class Web3AuthConnector extends AbstractWeb3Connector {
  type = 'Web3AuthConnector';

  activate = async ({ infuraId, ticker, hexChainId, displayName, clientId }) => {
    let Web3Auth;
    let CHAIN_NAMESPACES;
    let ADAPTER_STATUS;
    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }
    if (!infuraId) {
      throw new Error('"infuraId" not provided, please provide infuraId');
    }
    if (!ticker) {
      throw new Error('"ticker" not provided, please provide ticker');
    }
    if (!hexChainId) {
      throw new Error('"hexChainId" not provided, please provide hexChainId');
    }
    if (!displayName) {
      throw new Error('"displayName" not provided, please provide displayName');
    }
    if (!clientId) {
      throw new Error('"clientId" not provided, please provide clientId');
    }
    try {
      Web3Auth = require('@web3auth/web3auth')?.Web3Auth;
      CHAIN_NAMESPACES = require('@web3auth/base')?.CHAIN_NAMESPACES;
      ADAPTER_STATUS = require('@web3auth/base')?.ADAPTER_STATUS;
    } catch {
      // Do Nothing, error check for each is done below
    }
    if (!Web3Auth) {
      throw new Error('"@web3auth/web3auth" not installed, please install');
    }
    if (!CHAIN_NAMESPACES) {
      throw new Error('"@web3auth/base" not installed, please install');
    }
    if (!ADAPTER_STATUS) {
      throw new Error('"@web3auth/base" not installed, please install');
    }

    // Build Config
    const ethChainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: hexChainId,
      rpcTarget: `https://ropsten.infura.io/v3/${infuraId}`,
      displayName: displayName,
      blockExplorer: 'https://ropsten.etherscan.io/',
      ticker: ticker,
      tickerName: 'Ethereum',
    };
    let web3auth;
    try {
      web3auth = new Web3Auth({
        chainConfig: ethChainConfig,
        clientId: clientId,
      });
    } catch {
      // Do Nothing error checked below
    }
    if (!web3auth) {
      throw new Error('Error initializing Web3Auth');
    }

    await web3auth.initModal();
    web3auth?.connect();

    // Create Promise Structure To listen
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
            chainId: chainId,
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
