import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonAptosUtilsConfigSetup } from './config';

export class CommonAptosUtils extends Module {
  public static readonly moduleName = 'aptosUtils';

  public static create(core?: Core): CommonAptosUtils {
    return new CommonAptosUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(CommonAptosUtils.moduleName, core);
  }

  public setup() {
    CommonAptosUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
