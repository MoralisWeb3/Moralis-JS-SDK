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

  request(args) {
    return this.provider.request(args);
  }

  on(event, listener) {
    this.provider.on(event, listener);
  }

  once(event, listener) {
    this.provider.once(event, listener);
  }

  removeListener(event, listener) {
    this.provider.removeListener(event, listener);
  }

  off(event, listener) {
    this.provider.off(event, listener);
  }
}
