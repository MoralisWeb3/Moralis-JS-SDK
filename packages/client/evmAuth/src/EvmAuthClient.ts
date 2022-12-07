import { JsonRpcProvider } from '@ethersproject/providers';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthAdapter, AuthProvider, AuthStorage, User } from '@moralisweb3/client-adapter-utils';
import { Web3ProviderResolver } from './Web3ProviderResolver';
import { EvmAuthClientOptions, EvmProviderName } from './EvmAuthClientOptions';

const backendModuleName = 'evm';
const providerNameKey = 'evmProviderName';

export class EvmAuthClient implements Module {
  public static create(authAdapter: AuthAdapter, options?: EvmAuthClientOptions, core?: Core): EvmAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const authProvider = new AuthProvider(core, authAdapter);
    const authStorage = new AuthStorage();
    const web3ProviderResolver = new Web3ProviderResolver(options?.providerFactory);
    return new EvmAuthClient(authProvider, authStorage, web3ProviderResolver);
  }

  public readonly name = 'evmAuthClient';
  private provider: JsonRpcProvider | null = null;

  private constructor(
    private readonly authProvider: AuthProvider,
    private readonly authStorage: AuthStorage,
    private readonly web3ProviderResolver: Web3ProviderResolver,
  ) {}

  public async authenticate(providerName?: EvmProviderName): Promise<void> {
    const auth = await this.authProvider.get();
    if (auth.tryGetUser()) {
      throw new Error('You are already signed in');
    }

    const finalProviderName = providerName || 'default';
    const provider = await this.web3ProviderResolver.resolve(finalProviderName);

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
    });

    this.authStorage.set(providerNameKey, finalProviderName as string);
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
      throw new Error('You are not signed in');
    }

    await auth.signOut();
    this.authStorage.remove(providerNameKey);
    this.provider = null;
  }

  public async restoreProvider(): Promise<JsonRpcProvider> {
    if (this.provider) {
      return this.provider;
    }
    if (!(await this.isLoggedIn())) {
      throw new Error('You cannot restore Web3 provider if you are not singed in');
    }
    const providerName = this.authStorage.get(providerNameKey);
    if (!providerName) {
      throw new Error('Cannot restore Web3 provider');
    }
    this.provider = await this.web3ProviderResolver.resolve(providerName);
    return this.provider;
  }
}
