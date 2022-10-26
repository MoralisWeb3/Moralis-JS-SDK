import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtilsConfigSetup } from './config/CommonEvmUtilsConfigSetup';

export class CommonEvmUtils extends Module {
  public static readonly moduleName = 'evmUtils';

  public static create(core?: Core): CommonEvmUtils {
    return new CommonEvmUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(CommonEvmUtils.moduleName, core);
  }

  public setup() {
    CommonEvmUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
