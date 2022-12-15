import { Core, CoreProvider } from '@moralisweb3/common-core';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';

import { ClientEvmApi } from './generated/ClientEvmApi';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class EvmApi extends ClientEvmApi {
  public static moduleName = 'evmApi';

  public static create(core?: Core): EvmApi {
    return new EvmApi(core ?? CoreProvider.getDefault());
  }

  public readonly name = EvmApi.moduleName;
  public readonly baseUrl = BASE_URL;

  private constructor(protected readonly core: Core) {
    super();
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }
}
