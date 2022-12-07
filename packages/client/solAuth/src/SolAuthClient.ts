import { SolanaProvider } from './SolanaProvider';
import { encode } from 'bs58';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthProvider, User } from '@moralisweb3/client-backend-adapter-utils';
import { SolanaNetwork, SolAuthClientOptions } from './SolAuthClientOptions';
import { AuthClient } from '@moralisweb3/client-auth-utils';
import { SolWalletProviderResolver } from './SolWalletProviderResolver';

const backendModuleName = 'solana';

export class SolAuthClient implements Module, AuthClient<SolanaProvider> {
  public static create(authProvider: AuthProvider, options?: SolAuthClientOptions, core?: Core): SolAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const walletProviderResolver = new SolWalletProviderResolver(options?.walletProviders);
    return new SolAuthClient(authProvider, walletProviderResolver);
  }

  public readonly name = 'solAuthClient';
  private provider: SolanaProvider | null = null;

  private constructor(
    private readonly authProvider: AuthProvider,
    private readonly walletProviderResolver: SolWalletProviderResolver,
  ) {}

  public async authenticate(network?: SolanaNetwork, walletProviderName?: string): Promise<void> {
    const auth = await this.authProvider.get();
    if (auth.tryGetUser()) {
      throw new Error('You are already signed in');
    }

    if (!walletProviderName) {
      walletProviderName = 'default';
    }

    const provider = await this.walletProviderResolver.resolve(walletProviderName);

    const address = provider.publicKey.toBase58();
    const context = await auth.getMessageToSign(backendModuleName, {
      address,
      network: network ?? 'mainnet',
    });

    const encodedMessage = new TextEncoder().encode(context.message);

    const signature = await provider.signMessage(encodedMessage);

    await auth.signIn(backendModuleName, {
      message: context.message,
      signature: encode(signature.signature),
      payload: walletProviderName,
    });

    this.provider = provider;
  }

  public async tryGetUser(): Promise<User | null> {
    const auth = await this.authProvider.get();
    const credentials = auth.tryGetUser();
    if (credentials && credentials.networkType === 'solana') {
      return credentials;
    }
    return null;
  }

  public async isLoggedIn(): Promise<boolean> {
    return (await this.tryGetUser()) !== null;
  }

  public async logOut(): Promise<void> {
    const auth = await this.authProvider.get();
    if (!auth.tryGetUser()) {
      throw new Error('You are not signed in');
    }

    await auth.signOut();
    this.provider = null;
  }

  public async restoreProvider(): Promise<SolanaProvider> {
    if (this.provider) {
      return this.provider;
    }
    const user = await this.tryGetUser();
    if (!user) {
      throw new Error('You cannot restore Web3 provider if you are not singed in');
    }
    const walletProviderName = user.payload;
    if (!walletProviderName) {
      throw new Error('Cannot restore Solana provider');
    }
    this.provider = await this.walletProviderResolver.resolve(walletProviderName);
    return this.provider;
  }
}
