import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/common-core';
import { CommonSolUtilsConfigSetup } from './config';

export class CommonSolUtils extends Module {
  public static readonly moduleName = 'solUtils';

  public static create(core?: MoralisCore): CommonSolUtils {
    return new CommonSolUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(CommonSolUtils.moduleName, core);
  }

  public setup() {
    CommonSolUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
