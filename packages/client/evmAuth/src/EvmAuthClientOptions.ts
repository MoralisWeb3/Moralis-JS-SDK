import { EvmWalletProvider } from './EvmWalletProvider';

export interface EvmAuthClientOptions {
  /**
   * @description Custom Ethereum wallet providers.
   */
  walletProviders?: EvmWalletProvider[];
}
