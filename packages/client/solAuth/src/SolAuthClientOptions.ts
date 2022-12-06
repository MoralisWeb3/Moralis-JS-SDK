import { SolanaProvider } from './SolanaProvider';

export declare type SolanaNetwork = 'mainnet' | 'devnet';

export type SolProviderName = 'default' | string;

export type SolProviderFactory = (providerName: SolProviderName) => Promise<SolanaProvider> | SolanaProvider;

export interface SolAuthClientOptions {
  providerFactory?: SolProviderFactory;
}
