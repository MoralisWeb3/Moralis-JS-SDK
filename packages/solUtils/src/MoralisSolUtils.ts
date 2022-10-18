import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/core';
import { SolUtilsConfigSetup } from './config';

export class MoralisSolUtils extends Module {
  public static readonly moduleName = 'solUtils';

  public static create(core?: MoralisCore): MoralisSolUtils {
    return new MoralisSolUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisSolUtils.moduleName, core);
  }

  public setup() {
    SolUtilsConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }
}
