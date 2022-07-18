import { ApiModule, MoralisCore } from '@moralisweb3/core';
import { ApiConfigSetup } from './config/ApiConfigSetup';

export class MoralisApi extends ApiModule {
  public constructor(moduleName: string, core: MoralisCore, baseUrl: string) {
    super(moduleName, core, baseUrl);
  }

  public setup() {
    ApiConfigSetup.register(this.core.config);
  }

  public start(): void | Promise<void> {
    // Nothing...
  }
}
