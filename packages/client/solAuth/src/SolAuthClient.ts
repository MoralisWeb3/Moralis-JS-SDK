import { SolanaProvider } from './SolanaProvider';
import { encode } from 'bs58';
import { Core, CoreProvider, Module } from '@moralisweb3/common-core';
import { AuthBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';

export declare type SolanaNetwork = 'mainnet' | 'devnet';

export interface SolAuthClientOptions {
  provider?: SolanaProvider;
  network?: SolanaNetwork;
}

export interface SignInResult {
  provider: SolanaProvider;
  token: string;
}

const backendModuleName = 'solana';

export class SolAuthClient implements Module {
  public static create(backendAdapter: BackendAdapter, options?: SolAuthClientOptions, core?: Core): SolAuthClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    return new SolAuthClient(core, backendAdapter.createAuth(core), options);
  }

  public readonly name = 'generalSolAuthClient';

  private constructor(
    protected readonly core: Core,
    private readonly authBackendAdapter: AuthBackendAdapter,
    private readonly options?: SolAuthClientOptions,
  ) {}

  public async signIn(): Promise<SignInResult> {
    const provider = this.options?.provider ?? getDefaultProvider();

    await provider.connect();

    const address = provider.publicKey.toBase58();
    const context = await this.authBackendAdapter.requestAuthMessage(backendModuleName, {
      address,
      network: this.options?.network ?? 'mainnet',
    });

    const encodedMessage = new TextEncoder().encode(context.message);

    const signature = await provider.signMessage(encodedMessage);

    const token = await this.authBackendAdapter.issueAuthToken(backendModuleName, {
      message: context.message,
      signature: encode(signature.signature),
    });

    return {
      provider,
      token: token.token,
    };
  }
}

function getDefaultProvider(): SolanaProvider {
  // eslint-disable-next-line
  const provider = (window as any)['solana'];
  if (!provider) {
    throw new Error('Solana provider not found');
  }
  if (!provider.isPhantom) {
    throw new Error('Phantom provider not found');
  }
  return provider;
}
