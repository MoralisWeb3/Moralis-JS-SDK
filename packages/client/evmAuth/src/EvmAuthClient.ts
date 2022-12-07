import { JsonRpcProvider } from '@ethersproject/providers';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthProvider, User } from '@moralisweb3/client-backend-adapter-utils';
import { EvmWalletProviderResolver } from './EvmWalletProviderResolver';
import { EvmAuthClientOptions } from './EvmAuthClientOptions';
import { AuthClient, AuthClientError, AuthClientErrorCode } from '@moralisweb3/client-auth-utils';

const backendModuleName = 'evm';

export class EvmAuthClient implements Module, AuthClient<JsonRpcProvider> {
  public static create(authProvider: AuthProvider, options?: EvmAuthClientOptions, core?: Core): EvmAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const walletProviderResolver = new EvmWalletProviderResolver(options?.walletProviders);
    return new EvmAuthClient(authProvider, walletProviderResolver);
  }

  public readonly name = 'evmAuthClient';
  private provider: JsonRpcProvider | null = null;

  private constructor(
    private readonly authProvider: AuthProvider,
    private readonly walletProviderResolver: EvmWalletProviderResolver,
  ) {}

  public async authenticate(walletProviderName?: string): Promise<void> {
    const auth = await this.authProvider.get();
    if (auth.tryGetUser()) {
      throw new AuthClientError({
        code: AuthClientErrorCode.ALREADY_AUTHENTICATED,
        message: 'You are already authenticated',
      });
    }
    if (!walletProviderName) {
      walletProviderName = 'default';
    }

    const provider = await this.walletProviderResolver.resolve(walletProviderName);

    const [accounts, chain] = await Promise.all([provider.send('eth_accounts', []), provider.send('eth_chainId', [])]);

    const response = await auth.getMessageToSign(backendModuleName, {
      address: accounts[0],
      chain,
    });

    const signer = provider.getSigner();
    const signature = await signer.signMessage(response.message);

    await auth.signIn(backendModuleName, {
      message: response.message,
      signature,
      payload: walletProviderName,
    });

    this.provider = provider;
  }

  public async tryGetUser(): Promise<User | null> {
    const auth = await this.authProvider.get();
    const user = auth.tryGetUser();
    if (user && user.networkType === 'evm') {
      return user;
    }
    return null;
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.tryGetUser()) !== null;
  }

  public async logOut(): Promise<void> {
    const auth = await this.authProvider.get();
    if (!auth.tryGetUser()) {
      throw new AuthClientError({
        code: AuthClientErrorCode.NOT_AUTHENTICATED,
        message: 'You are not authenticated',
      });
    }

    await auth.signOut();
    this.provider = null;
  }

  public async restoreProvider(): Promise<JsonRpcProvider> {
    if (this.provider) {
      return this.provider;
    }

    const user = await this.tryGetUser();
    if (!user) {
      throw new AuthClientError({
        code: AuthClientErrorCode.NOT_AUTHENTICATED,
        message: 'You cannot restore EVM provider if you are not authenticated',
      });
    }

    const walletProviderName = user.payload;
    if (!walletProviderName) {
      throw new AuthClientError({
        code: AuthClientErrorCode.GENERIC,
        message: 'Cannot restore provider name',
      });
    }

    this.provider = await this.walletProviderResolver.resolve(walletProviderName);
    return this.provider;
  }
}
