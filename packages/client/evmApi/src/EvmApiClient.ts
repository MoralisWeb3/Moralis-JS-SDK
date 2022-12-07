import { EvmApiClient as GeneratedEvmApiClient } from './generated/EvmApiClient';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ApiClient, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';

export class EvmApiClient extends GeneratedEvmApiClient {
  public static create(backendAdapter: BackendAdapter, core?: Core): EvmApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const apiClient = backendAdapter.createApiClient(core);
    return new EvmApiClient(apiClient, core);
  }

  public readonly name = 'evmApiClient';

  private constructor(protected readonly apiClient: ApiClient, protected readonly core: Core) {
    super();
  }
}
