import { Core, CoreProvider } from '@moralisweb3/common-core';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';

import { ClientEvmApi } from './generated/ClientEvmApi';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class EvmApi extends ClientEvmApi {
  public static readonly moduleName = 'evmApi';

  public static create(core?: Core): EvmApi {
    return new EvmApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(EvmApi.moduleName, core, BASE_URL);
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
