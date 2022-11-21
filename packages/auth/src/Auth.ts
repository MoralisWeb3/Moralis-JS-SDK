import { ApiModule, Core, CoreProvider, ResponseAdapter } from '@moralisweb3/common-core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, VerifyEvmOptions, VerifyOptions, VerifySolOptions } from './methods/verify';
import { VerifyChallengeEvmJSONResponse, VerifyChallengeEvmResponse } from './operations/evm';
import { VerifyChallengeSolanaJSONResponse, VerifyChallengeSolanaResponse } from './operations/solana';

export const BASE_URL = 'https://authapi.moralis.io';

type VerifyEvmResponse = Promise<ResponseAdapter<VerifyChallengeEvmResponse, VerifyChallengeEvmJSONResponse>>;
type VerifySolanaResponse = Promise<ResponseAdapter<VerifyChallengeSolanaResponse, VerifyChallengeSolanaJSONResponse>>;

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
  public verify(options: VerifyEvmOptions): VerifyEvmResponse;
  public verify(options: VerifySolOptions): VerifySolanaResponse;
  public verify(options: VerifyOptions) {
    return makeVerify(this.core)(options);
  }
}
