import { SolWalletProvider } from './SolWalletProvider';

export declare type SolanaNetwork = 'mainnet' | 'devnet';

export interface SolAuthClientOptions {
  /**
   * @description Custom Solana wallet providers.
   */
  walletProviders?: SolWalletProvider[];
}
