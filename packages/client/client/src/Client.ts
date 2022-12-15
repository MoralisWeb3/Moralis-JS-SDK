import { EvmApiClient } from '@moralisweb3/client-evm-api';
import { SolApiClient } from '@moralisweb3/client-sol-api';
import { User } from '@moralisweb3/client-auth-utils';
import { EvmAuthClient, EvmAuthClientOptions } from '@moralisweb3/client-evm-auth';
import { SolAuthClient, SolAuthClientOptions } from '@moralisweb3/client-sol-auth';
import { BackendAdapter, AuthProvider } from '@moralisweb3/client-backend-adapter-utils';
import { RestBackendAdapter, RestBackendAdapterOptions } from '@moralisweb3/client-backend-adapter-rest';
import { Core } from '@moralisweb3/common-core';

export interface ClientOptions {
  backendAdapter?: BackendAdapter;
  defaultBackendAdapter?: RestBackendAdapterOptions;

  evmAuth?: EvmAuthClientOptions;
  solAuth?: SolAuthClientOptions;
}

export class Client {
  public static create(options?: ClientOptions, core?: Core): Client {
    if (!core) {
      core = Core.create();
    }

    const backendAdapter = options?.backendAdapter ?? RestBackendAdapter.create(options?.defaultBackendAdapter);
    const authProvider = AuthProvider.create(backendAdapter, core);

    const evmApi = EvmApiClient.create(backendAdapter, core);
    const evmAuth = EvmAuthClient.create(authProvider, options?.evmAuth, core);
    const solApi = SolApiClient.create(backendAdapter, core);
    const solAuth = SolAuthClient.create(authProvider, options?.solAuth, core);
    core.registerModules([evmApi, evmAuth, solApi, solAuth]);

    return new Client(core, evmApi, evmAuth, solApi, solAuth);
  }

  private constructor(
    public readonly core: Core,
    public readonly evmApi: EvmApiClient,
    public readonly evmAuth: EvmAuthClient,
    public readonly solApi: SolApiClient,
    public readonly solAuth: SolAuthClient,
  ) {}

  public start() {
    this.core.start();
  }

  /**
   * @description Returns a connected or authorized user from EvmAuth or SolAuth modules. Otherwise returns `null`.
   */
  public async tryGetUser(): Promise<User | null> {
    const users = await Promise.all([this.evmAuth.tryGetUser(), this.solAuth.tryGetUser()]);
    return users[0] || users[1];
  }
}
