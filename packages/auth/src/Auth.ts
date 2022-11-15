import { ApiModule, Core, CoreProvider } from '@moralisweb3/common-core';
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

export class Auth extends ApiModule {
  public static readonly moduleName = 'auth';

  public static create(core?: Core): Auth {
    return new Auth(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(Auth.moduleName, core, BASE_URL);
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
