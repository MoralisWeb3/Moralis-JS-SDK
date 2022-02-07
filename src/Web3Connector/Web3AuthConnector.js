import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

export class Web3AuthConnector extends AbstractWeb3Connector {
  type = 'Web3AuthConnector';

  activate = async ({ rpcTarget, hexChainId, displayName, clientId }) => {
    // Checking that all params are given
    if (!rpcTarget) {
      throw new Error('"infuraId" not provided, please provide infuraId');
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

    // Initalizing Web3Auth
    const { Web3Auth } = require('@web3auth/web3auth');
    const { CHAIN_NAMESPACES, ADAPTER_STATUS } = require('@web3auth/base');
    if (!Web3Auth) {
      throw new Error('"@web3auth/web3auth" not installed, please install');
    }
    if (!CHAIN_NAMESPACES) {
      throw new Error('"@web3auth/base" not installed, please install');
    }
    if (!ADAPTER_STATUS) {
      throw new Error('"@web3auth/base" not installed, please install');
    }
    const ethChainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: hexChainId,
      rpcTarget: rpcTarget,
      displayName: displayName,
      blockExplorer: 'https://ropsten.etherscan.io/',
      ticker: 'ETH',
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

    // Authenticating
    await web3auth.initModal();
    let provider = null;
    try {
      provider = await web3auth.connect();
    } catch {
      // Do nothing, check next line down
    }

    if (!provider) {
      throw new Error('Error authenticating');
    }

    // Gathering data
    try {
      const isSocialLogin = web3auth?.provider ? false : true;
      const ether = new ethers.providers.Web3Provider(
        web3auth?.provider ? web3auth.provider : web3auth
      );

      const signer = ether.getSigner();
      const { chainId } = await ether.getNetwork();
      const address = (await signer.getAddress()).toLowerCase();

      this.account = address;
      this.chainId = `0x${chainId.toString(16)}`;
      this.provider = isSocialLogin ? ether : web3auth?.provider;

      this.web3Instance = web3auth;
      this.subscribeToEvents(this.provider);
      return {
        chainId: this.chainId,
        account: this.account,
        provider: this.provider,
      };
    } catch {
      throw new Error('An Error occurred while authenticating please retry');
    }
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
