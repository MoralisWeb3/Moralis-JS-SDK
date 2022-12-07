import { AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';
import { SolanaProvider } from './SolanaProvider';
import { SolWalletProvider } from './SolWalletProvider';

export class DefaultSolWalletProvider implements SolWalletProvider {
  public readonly name = 'default';

  public async create(): Promise<SolanaProvider> {
    // eslint-disable-next-line
    const provider = (window as any)['solana'] as SolanaProvider | null;
    if (!provider) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Solana provider is not available',
      });
    }

    if (!provider.isPhantom) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Default provider supports only Phantom wallet',
      });
    }

    await provider.connect();
    return provider;
  }
}
