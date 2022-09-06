import { Module, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { ApiConfigSetup } from './config/ApiConfigSetup';

export class MoralisApiUtils extends Module {
  public static readonly moduleName = 'api';

  public static create(core?: MoralisCore): MoralisApiUtils {
    return new MoralisApiUtils(core ?? MoralisCoreProvider.getDefault());
  }

  public constructor(core: MoralisCore) {
    super(MoralisApiUtils.moduleName, core);
  }

  public setup() {
    ApiConfigSetup.register(this.core.config);
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
