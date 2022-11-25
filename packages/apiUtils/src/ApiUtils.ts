import { Module, Core, CoreProvider } from '@moralisweb3/common-core';
import { ApiUtilsConfigSetup } from './config/ApiUtilsConfigSetup';

export class ApiUtils implements Module {
  public static create(core?: Core): ApiUtils {
    return new ApiUtils(core ?? CoreProvider.getDefault());
  }

  public readonly name = 'apiUtils';

  public constructor(private readonly core: Core) {}

  public setup() {
    ApiUtilsConfigSetup.register(this.core.config);
  }
}
