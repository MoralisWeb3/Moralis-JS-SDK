import { ethers } from 'ethers';
import verifyChainId from '../utils/verifyChainId';
import AbstractWeb3Connector from './AbstractWeb3Connector';
import { Web3ConnectorChainConstants } from './Web3ConnectorChainConstants';

export class Web3Auth extends AbstractWeb3Connector {
  type = 'web3Auth';

  activate = async ({ rpcTarget, hexChainId, clientId }) => {
    // Checking that all params are given
    if (!rpcTarget) {
      throw new Error('"rpcUrl" not provided, please provide infuraId');
    }
    if (!hexChainId) {
      throw new Error('"hexChainId" not provided, please provide hexChainId');
    }
    if (!clientId) {
      throw new Error('"clientId" not provided, please provide clientId');
    }

    // Initalizing Web3Auth
    let Web3Auth;
    let CHAIN_NAMESPACES;
    let ADAPTER_STATUS;
    try {
      Web3Auth = require('@web3auth/web3auth')?.Web3Auth;
      CHAIN_NAMESPACES = require('@web3auth/base')?.CHAIN_NAMESPACES;
      ADAPTER_STATUS = require('@web3auth/base')?.ADAPTER_STATUS;
    } catch {
      // Do Nothing Individual Checks are done below
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

    const chainMetaData = Web3ConnectorChainConstants[verifyChainId(hexChainId)];
    if (!chainMetaData) {
      throw new Error('"hexChainId" not supported, please double check chainId');
    }

    const ethChainConfig = {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: chainMetaData.chainId,
      rpcTarget: rpcTarget,
      displayName: chainMetaData.displayName,
      blockExplorer: chainMetaData.blockExplorer,
      ticker: chainMetaData.ticker,
      tickerName: chainMetaData.tickerName,
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
      const values = await Promise.all([ether.getNetwork(), signer.getAddress()]);
      const providerChainId = values[0].chainId;

      this.account = values[1].toLocaleLowerCase();
      this.chainId = `0x${providerChainId.toString(16)}`;
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
