import { ApiModule, Core, CoreProvider } from '@moralisweb3/common-core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, VerifyEvmOptions, VerifyOptions, VerifySolOptions } from './methods/verify';
import { VerifyChallengeEvmResponseAdapter } from './operations/evm';
import { VerifyChallengeSolanaResponseAdapter } from './operations/solana';

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
  public verify(options: VerifyEvmOptions): Promise<VerifyChallengeEvmResponseAdapter>;
  public verify(options: VerifySolOptions): Promise<VerifyChallengeSolanaResponseAdapter>;
  public verify(options: VerifyOptions) {
    return makeVerify(this.core)(options);
  }
}
