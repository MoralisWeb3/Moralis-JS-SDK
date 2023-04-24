import { Core, CoreProvider } from '@moralisweb3/common-core';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';

import { ClientEvmApi } from './generated/ClientEvmApi';
import { EvmApiConfig } from './config/EvmApiConfig';

export class EvmApi extends ClientEvmApi {
  public static readonly moduleName = 'evmApi';

  public static create(core?: Core): EvmApi {
    return new EvmApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(EvmApi.moduleName, core, () => core.config.get(EvmApiConfig.evmApiBaseUrl));
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
