import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/common-core';
import { CommonEvmUtilsConfigSetup } from './config/CommonEvmUtilsConfigSetup';

export class CommonEvmUtils extends Module {
  public static readonly moduleName = 'evmUtils';

  public static create(core?: MoralisCore): CommonEvmUtils {
    return new CommonEvmUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(CommonEvmUtils.moduleName, core);
  }

  public setup() {
    CommonEvmUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
