/* global window */

import AbstractWeb3Connector from './AbstractWeb3Connector';
import EventEmitter from 'events';
import verifyChainId from '../utils/verifyChainId';

export const InjectedEvents = Object.freeze({
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
});

class NoEthereumProviderError extends Error {
  constructor() {
    super();
    this.message = 'Non ethereum enabled browser';
  }
}

/**
 * Connector to connect an injected provider (like Metamask) to Moralis
 * The provider should be injected in window.ethereum
 */
class InjectedWeb3Connector extends AbstractWeb3Connector {
  type = 'injected';

  verifyEthereumBrowser() {
    if (!window?.ethereum) {
      throw new NoEthereumProviderError();
    }
  }

  async activate() {
    this.verifyEthereumBrowser();

    const [accounts, chainId] = await Promise.all([
      window.ethereum.request({
        method: 'eth_requestAccounts',
      }),
      window.ethereum.request({ method: 'eth_chainId' }),
    ]);

    const account = accounts[0] ? accounts[0].toLowerCase() : null;

    const provider = window.ethereum;
    this.chainId = chainId;
    this.account = account;
    this.provider = provider;

    this.subscribeToEvents(provider);

    return { provider, chainId, account };
  }

  async switchNetwork(chainId) {
    this.verifyEthereumBrowser();
    chainId = verifyChainId(chainId);

    const currentNetwork = this.chainId;
    if (currentNetwork === chainId) return;

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  }

  async addNetwork(chainId, chainName, currencyName, currencySymbol, rpcUrl, blockExplorerUrl) {
    this.verifyEthereumBrowser();

    const newchainId = verifyChainId(chainId);
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: newchainId,
          chainName: chainName,
          nativeCurrency: {
            name: currencyName,
            symbol: currencySymbol,
            decimals: 18,
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : null,
        },
      ],
    });
  }
}

export default InjectedWeb3Connector;
