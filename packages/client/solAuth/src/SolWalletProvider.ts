import { SolanaProvider } from './SolanaProvider';

export interface SolWalletProvider {
  name: string;
  create(): Promise<SolanaProvider> | SolanaProvider;
}
