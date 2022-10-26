import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonSolUtilsConfigSetup } from './config';

export class CommonSolUtils extends Module {
  public static readonly moduleName = 'solUtils';

  public static create(core?: Core): CommonSolUtils {
    return new CommonSolUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(CommonSolUtils.moduleName, core);
  }

  public setup() {
    CommonSolUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
