import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, VerifyOptions } from './methods/verify';

export const BASE_URL = 'https://auth-api.do-prod-1.moralis.io';

export class MoralisAuth extends ApiModule {
  public static readonly moduleName = 'auth';

  public static create(core?: MoralisCore): MoralisAuth {
    return new MoralisAuth(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisAuth.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  requestMessage = (options: RequestMessageOptions) => makeRequestMessage()(options);
  verify = (options: VerifyOptions) => makeVerify()(options);
}
