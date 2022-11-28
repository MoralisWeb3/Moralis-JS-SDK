import { ApiModule, Core, CoreProvider, ModuleType } from '@moralisweb3/common-core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, VerifyEvmOptions, VerifyOptions, VerifySolOptions } from './methods/verify';
import {
  VerifyChallengeSolanaResponseAdapter,
  VerifyChallengeEvmResponseAdapter,
} from '@moralisweb3/common-auth-utils';

export const BASE_URL = 'https://authapi.moralis.io';

export class Auth implements ApiModule {
  public static moduleName = 'auth';

  public static create(core?: Core): Auth {
    return new Auth(core ?? CoreProvider.getDefault());
  }

  public readonly name = Auth.moduleName;
  public readonly type = ModuleType.API;
  public readonly baseUrl = BASE_URL;

  private constructor(private readonly core: Core) {}

  public requestMessage = (options: RequestMessageOptions) => makeRequestMessage(this.core)(options);

  // Function overloading to make typescript happy
  public verify(options: VerifyEvmOptions): Promise<VerifyChallengeEvmResponseAdapter>;
  public verify(options: VerifySolOptions): Promise<VerifyChallengeSolanaResponseAdapter>;
  public verify(options: VerifyOptions) {
    return makeVerify(this.core)(options);
  }
}
