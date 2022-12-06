import { ApiAdapter, ApiOperationResolver } from '@moralisweb3/client-adapter-utils';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { SolApiClient as GeneratedSolApiClient } from './generated/SolApiClient';

export class SolApiClient extends GeneratedSolApiClient {
  public static create(apiAdapter: ApiAdapter, core?: Core): SolApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const apiResolver = apiAdapter.createResolver(core);
    return new SolApiClient(apiResolver, core);
  }

  public readonly name = 'generalSolApiClient';

  private constructor(protected readonly apiResolver: ApiOperationResolver, protected readonly core: Core) {
    super();
  }
}
