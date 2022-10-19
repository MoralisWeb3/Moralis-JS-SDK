import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/core';
import { EvmUtilsConfigSetup } from './config/EvmUtilsConfigSetup';

export class MoralisEvmUtils extends Module {
  public static readonly moduleName = 'evmUtils';

  public static create(core?: MoralisCore): MoralisEvmUtils {
    return new MoralisEvmUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisEvmUtils.moduleName, core);
  }

  public setup() {
    EvmUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
