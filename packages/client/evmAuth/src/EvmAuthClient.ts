import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import detectEthereumProvider from '@metamask/detect-provider';

export interface EvmAuthClientOptions {
  /**
   * @description Custom Ethereum provider.
   */
  provider?: JsonRpcProvider | Web3Provider;
}

const backendModuleName = 'evm';

export class EvmAuthClient implements Module {
  public static create(backendAdapter: BackendAdapter, options?: EvmAuthClientOptions, core?: Core): EvmAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    return new EvmAuthClient(core, backendAdapter.createAuth(core), options);
  }

  public readonly name = 'evmAuthClient';

  private constructor(
    protected readonly core: Core,
    private readonly authBackendAdapter: AuthBackendAdapter,
    private readonly options?: EvmAuthClientOptions,
  ) {}

  public async signIn(): Promise<SignInResult> {
    const provider = this.options?.provider ?? (await getDefaultProvider());

    const [accounts, chain] = await Promise.all([provider.send('eth_accounts', []), provider.send('eth_chainId', [])]);

    const response1 = await this.authBackendAdapter.requestAuthMessage(backendModuleName, {
      address: accounts[0],
      chain,
    });

    const signer = provider.getSigner();
    const signature = await signer.signMessage(response1.message);

    const response2 = await this.authBackendAdapter.issueAuthToken(backendModuleName, {
      message: response1.message,
      signature,
    });

    return {
      provider,
      token: response2.token,
    };
  }

  public setup() {
    // Nothing...
  }

  public start() {
    // Nothing...
  }
}

export interface SignInResult {
  provider: JsonRpcProvider;
  token: string;
}

async function getDefaultProvider(): Promise<JsonRpcProvider> {
  const ethereum = await detectEthereumProvider();
  if (!ethereum) {
    throw new Error('Ethereum provider not found');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new Web3Provider(ethereum as any, 'any');
  await provider.send('eth_requestAccounts', []);
  return provider;
}
