import { JsonRpcProvider } from '@ethersproject/providers';
import { EvmWalletProvider } from './EvmWalletProvider';
import { DefaultEvmWalletProvider } from './DefaultEvmWalletProvider';
import { AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';

const defaultWalletProvider = new DefaultEvmWalletProvider();

export class EvmWalletProviderResolver {
  public constructor(private readonly providers: EvmWalletProvider[] | undefined) {}

  public async resolve(name: string): Promise<JsonRpcProvider> {
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
