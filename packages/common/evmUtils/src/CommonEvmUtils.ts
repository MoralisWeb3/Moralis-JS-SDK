import Core, { Module, CoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtilsConfigSetup } from './config/CommonEvmUtilsConfigSetup';

export class CommonEvmUtils implements Module {
  public readonly name = 'evmUtils';

  public static create(core?: Core): CommonEvmUtils {
    return new CommonEvmUtils(core ?? CoreProvider.getDefault());
  }

  private constructor(private readonly core: Core) {}

  public setup() {
    CommonEvmUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
