import { Module, Core, CoreProvider } from '@moralisweb3/common-core';
import { ApiUtilsConfigSetup } from './config/ApiUtilsConfigSetup';

export class ApiUtils extends Module {
  public static readonly moduleName = 'api';

  public static create(core?: Core): ApiUtils {
    return new ApiUtils(core ?? CoreProvider.getDefault());
  }

  public constructor(core: Core) {
    super(ApiUtils.moduleName, core);
  }

  public setup() {
    ApiUtilsConfigSetup.register(this.core.config);
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
