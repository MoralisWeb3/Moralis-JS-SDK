import { Module, MoralisCore, MoralisCoreProvider } from '@moralisweb3/common-core';
import { ApiUtilsConfigSetup } from './config/ApiUtilsConfigSetup';

export class ApiUtils extends Module {
  public static readonly moduleName = 'api';

  public static create(core?: MoralisCore): ApiUtils {
    return new ApiUtils(core ?? MoralisCoreProvider.getDefault());
  }

  public constructor(core: MoralisCore) {
    super(ApiUtils.moduleName, core);
  }

  public setup() {
    ApiUtilsConfigSetup.register(this.core.config);
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
