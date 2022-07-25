import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/core';

export class MoralisSolUtils extends Module {
  public static readonly moduleName = 'evmUtils';

  public static create(core?: MoralisCore): MoralisSolUtils {
    return new MoralisSolUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisSolUtils.moduleName, core);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }
}
