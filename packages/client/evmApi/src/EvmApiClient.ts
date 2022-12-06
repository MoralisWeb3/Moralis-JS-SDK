import { EvmApiClient as GeneratedEvmApiClient } from './generated/EvmApiClient';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ApiAdapter } from '@moralisweb3/client-adapter-utils';
import { ApiOperationResolver } from '@moralisweb3/client-adapter-utils/lib/ApiOperationResolver';

export class EvmApiClient extends GeneratedEvmApiClient {
  public static create(apiAdapter: ApiAdapter, core?: Core): EvmApiClient {
    if (!core) {
      core = CoreProvider.getDefault();
    }
    const apiResolver = apiAdapter.createResolver(core);
    return new EvmApiClient(apiResolver, core);
  }

  public readonly name = 'evmApiClient';

  private constructor(protected readonly apiResolver: ApiOperationResolver, protected readonly core: Core) {
    super();
  }
}
