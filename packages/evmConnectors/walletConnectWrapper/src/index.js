import WalletConnectProvider from '@walletconnect/web3-provider';

// Remember to update ../index.d.ts after any change.
export class WalletConnectProviderWrapper {
  constructor(opts) {
    this.provider = new WalletConnectProvider(opts);

    Object.defineProperty(this, 'chainId', {
      get: () => this.provider.chainId,
    });
  }

  enable() {
    return this.provider.enable();
  }

  disconnect() {
    return this.provider.disconnect();
  }
}
