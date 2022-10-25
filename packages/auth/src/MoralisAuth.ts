import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/common-core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import {
  makeVerify,
  VerifyEvmData,
  VerifyEvmOptions,
  VerifyOptions,
  VerifySolData,
  VerifySolOptions,
} from './methods/verify';

export const BASE_URL = 'https://authapi.moralis.io';

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

  public requestMessage = (options: RequestMessageOptions) => makeRequestMessage(this.core)(options);

  // Function overloading to make typescript happy
  public verify(options: VerifyEvmOptions): VerifyEvmData;
  public verify(options: VerifySolOptions): VerifySolData;
  public verify(options: VerifyOptions) {
    return makeVerify(this.core)(options);
  }
}
