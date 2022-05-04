import { MoralisNetworkError, NetworkErrorCode } from '@moralis/core';
import { EvmAbstractConnector } from '@moralis/evm-connector-utils';
import MetamaskConnector from '@moralis/evm-metamask-connector';

const DEFAULT_WALLETS: EvmAbstractConnector[] = [MetamaskConnector];

export class Wallets {
  private _wallets = new Map<string, EvmAbstractConnector>();

  constructor() {
    DEFAULT_WALLETS.forEach((wallet) => this.register(wallet));
  }

  /**
   * Register a new wallet based on a EvmAbstractConnector
   */
  register = (wallet: EvmAbstractConnector) => {
    if (this._wallets.has(wallet.name)) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.DUPLICATE_WALLET,
        message: `The wallet ${wallet.name} has already been registered.`,
      });
    }

    this._wallets.set(wallet.name, wallet);
  };

  /**
   * Returns the wallet with the given name.
   * This wallet should have been registered with `register`
   * Throws an error if no wallet with the given name has been registered.
   */
  get = (name: string): EvmAbstractConnector => {
    const module = this._wallets.get(name);

    if (!module) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.WALLET_NOT_FOUND,
        message: `Wallet "${name}" does not exist.`,
      });
    }

    return module;
  };

  /**
   * Remove the wallet with the provided name, if it has been registered,
   * or throws an error if the wallet cannot be found.
   */
  remove = (name: string) => {
    const isRemoved = this._wallets.delete(name);

    if (!isRemoved) {
      throw new MoralisNetworkError({
        code: NetworkErrorCode.WALLET_NOT_FOUND,
        message: `Wallet "${name}" does not exist.`,
      });
    }
  };

  /**
   * List all the registered wallets
   */
  list = () => {
    return Array.from(this._wallets.values());
  };

  /**
   * Returns the names of all registered wallets
   */
  get names() {
    return this.list().map((module) => module.name);
  }
}
