import { BackendAdapter, ApiClient } from '@moralisweb3/client-backend-adapter-utils';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { SolApiClient as GeneratedSolApiClient } from './generated/SolApiClient';

export class SolApiClient extends GeneratedSolApiClient {
  public static create(backendAdapter: BackendAdapter, core?: Core): SolApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const apiClient = backendAdapter.createApiClient(core);
    return new SolApiClient(apiClient, core);
  }

  public readonly name = 'solApiClient';

  private constructor(protected readonly apiClient: ApiClient, protected readonly core: Core) {
    super();
  }
}
