import { EvmApiClient as GeneratedEvmApiClient } from './generated/EvmApiClient';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ApiBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';

export class EvmApiClient extends GeneratedEvmApiClient {
  public static create(backendAdapter: BackendAdapter, core?: Core): EvmApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    return new EvmApiClient(backendAdapter.createApi(core), core);
  }

  public readonly name = 'evmApiClient';

  private constructor(protected readonly apiBackendAdapter: ApiBackendAdapter, protected readonly core: Core) {
    super();
  }
}
