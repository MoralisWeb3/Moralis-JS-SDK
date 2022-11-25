import { ApiBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { SolApiClient as GeneratedSolApiClient } from './generated/SolApiClient';

export class SolApiClient extends GeneratedSolApiClient {
  public static create(backendAdapter: BackendAdapter, core?: Core): SolApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    return new SolApiClient(backendAdapter.createApi(core), core);
  }

  public readonly name = 'generalSolApiClient';

  private constructor(protected readonly apiBackendAdapter: ApiBackendAdapter, protected readonly core: Core) {
    super();
  }
}
