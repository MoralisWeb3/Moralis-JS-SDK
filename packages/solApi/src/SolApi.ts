import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ClientSolApi } from './generated/ClientSolApi';
import { EvmSolApiConfigSetup } from './config/SolApiConfigSetup';
import { SolApiConfig } from './config/SolApiConfig';

export class SolApi extends ClientSolApi {
  public static readonly moduleName = 'solApi';

  public static create(core?: Core): SolApi {
    return new SolApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(SolApi.moduleName, core, () => core.config.get(SolApiConfig.solApiBaseUrl));
  }

  public setup() {
    EvmSolApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
