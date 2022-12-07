import { AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';
import { SolWalletProvider } from './SolWalletProvider';
import { SolanaProvider } from './SolanaProvider';
import { DefaultSolWalletProvider } from './DefaultSolWalletProvider';

const defaultWalletProvider = new DefaultSolWalletProvider();

export class SolWalletProviderResolver {
  public constructor(private readonly providers: SolWalletProvider[] | undefined) {}

  public async resolve(name: string): Promise<SolanaProvider> {
    if (!name || name === defaultWalletProvider.name) {
      return defaultWalletProvider.create();
    }
    if (this.providers) {
      const provider = this.providers.find((prov) => prov.name === name);
      if (provider) {
        return provider.create();
      }
    }

    throw new AuthClientError({
      code: AuthClientErrorCode.GENERIC,
      message: `Cannot find wallet provider: ${name}`,
    });
  }
}
