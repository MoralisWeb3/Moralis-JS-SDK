import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { SolApiClient } from '@moralisweb3/client-sol-api';
import { EvmAuthClient, EvmAuthClientOptions } from '@moralisweb3/client-evm-auth';
import { SolAuthClient, SolAuthClientOptions } from '@moralisweb3/client-sol-auth';
import { ApiAdapter, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import {
  GeneralApiAdapter,
  GeneralApiAdapterOptions,
  GeneralAuthAdapter,
  GeneralAuthAdapterOptions,
} from '@moralisweb3/client-adapter-general';
import { Core } from '@moralisweb3/common-core';

export interface ClientOptions {
  apiAdapter?: ApiAdapter;
  defaultApiAdapterOptions?: GeneralApiAdapterOptions;
  authAdapter?: AuthAdapter;
  defaultAuthAdapterOptions?: GeneralAuthAdapterOptions;

  evmAuthOptions?: EvmAuthClientOptions;
  solAuthOptions?: SolAuthClientOptions;
}

export class Client {
  public static create(options?: ClientOptions, core?: Core): Client {
    if (!core) {
      core = Core.create();
    }

    const apiAdapter = options?.apiAdapter ?? GeneralApiAdapter.create(options?.defaultApiAdapterOptions);
    const authAdapter = options?.authAdapter ?? GeneralAuthAdapter.create(options?.defaultAuthAdapterOptions);

    const evmApi = EvmApiClient.create(apiAdapter, core);
    const evmAuth = EvmAuthClient.create(authAdapter, options?.evmAuthOptions, core);
    const solApi = SolApiClient.create(apiAdapter, core);
    const solAuth = SolAuthClient.create(authAdapter, options?.solAuthOptions, core);
    core.registerModules([evmApi, evmAuth, solApi, solAuth]);

    return new Client(core, evmApi, evmAuth, solApi, solAuth);
  }

  private constructor(
    private readonly core: Core,
    public readonly evmApi: EvmApiClient,
    public readonly evmAuth: EvmAuthClient,
    public readonly solApi: SolApiClient,
    public readonly solAuth: SolAuthClient,
  ) {}

  public async start(): Promise<void> {
    await this.core.start();
  }
}
