import { Module, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { ApiConfigSetup } from './config/ApiConfigSetup';

export class MoralisApi extends Module {
  public static readonly moduleName = 'api';

  public static create(core?: MoralisCore): MoralisApi {
    return new MoralisApi(core ?? MoralisCoreProvider.getDefault());
  }

  public constructor(core: MoralisCore) {
    super(MoralisApi.moduleName, core);
  }

  public setup() {
    ApiConfigSetup.register(this.core.config);
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
