import { SolConnector } from './SolConnector';

export declare type SolanaNetwork = 'mainnet' | 'devnet';

export interface SolAuthClientOptions {
  /**
   * @description Custom Solana wallet connectors.
   */
  connectors?: SolConnector[];
}
