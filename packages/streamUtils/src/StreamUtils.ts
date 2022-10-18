import MoralisCore, { Module, MoralisCoreProvider } from '@moralisweb3/core';

export class MoralisStreamUtils extends Module {
  public static readonly moduleName = 'streamUtils';

  public static create(core?: MoralisCore): MoralisStreamUtils {
    return new MoralisStreamUtils(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisStreamUtils.moduleName, core);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }
}
