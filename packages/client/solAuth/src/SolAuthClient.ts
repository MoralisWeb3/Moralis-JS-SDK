import { SolanaProvider } from './SolanaProvider';
import { encode } from 'bs58';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthAdapter, AuthProvider, AuthStorage, User } from '@moralisweb3/client-adapter-utils';
import { SolanaNetwork, SolAuthClientOptions, SolProviderName } from './SolAuthClientOptions';
import { SolanaProviderResolver } from './SolanaProviderResolver';

const backendModuleName = 'solana';
const providerNameKey = 'solProviderName';

export class SolAuthClient implements Module {
  public static create(authAdapter: AuthAdapter, options?: SolAuthClientOptions, core?: Core): SolAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const authProvider = new AuthProvider(core, authAdapter);
    const authStorage = new AuthStorage();
    const solProviderResolver = new SolanaProviderResolver(options?.providerFactory);
    return new SolAuthClient(authProvider, authStorage, solProviderResolver);
  }

  public readonly name = 'generalSolAuthClient';
  private provider: SolanaProvider | null = null;

  private constructor(
    private readonly authProvider: AuthProvider,
    private readonly authStorage: AuthStorage,
    private readonly solProviderResolver: SolanaProviderResolver,
  ) {}

  public async authenticate(network?: SolanaNetwork, providerName?: SolProviderName): Promise<void> {
    const auth = await this.authProvider.get();
    if (auth.tryGetUser()) {
      throw new Error('You are already signed in');
    }

    const finalProviderName = providerName || 'default';
    const provider = await this.solProviderResolver.resolve(providerName || finalProviderName);

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
    });

    this.authStorage.set(providerNameKey, finalProviderName as string);
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
    this.authStorage.remove(providerNameKey);
    this.provider = null;
  }

  public async restoreProvider(): Promise<SolanaProvider> {
    if (this.provider) {
      return this.provider;
    }
    if (!(await this.isLoggedIn())) {
      throw new Error('You cannot restore Solana provider if you are not singed in');
    }
    const providerName = this.authStorage.get(providerNameKey);
    if (!providerName) {
      throw new Error('Cannot restore Solana provider');
    }
    this.provider = await this.solProviderResolver.resolve(providerName);
    return this.provider;
  }
}
