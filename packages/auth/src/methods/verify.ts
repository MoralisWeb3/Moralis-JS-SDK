import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/core';
import { BASE_URL } from '../MoralisAuth';
import { completeChallengeEvm, completeChallengeSol } from '../resolvers';
import { AuthNetwork } from './requestMessage';

export interface VerifyEvmOptions {
  message: string;
  signature: string;
  network: 'evm';
}

export interface VerifySolOptions {
  message: string;
  signature: string;
  network: 'solana';
}

export type VerifyOptions = VerifyEvmOptions | VerifySolOptions;

export type VerifyEvmData = ReturnType<typeof makeEvmVerify>;
export type VerifySolData = ReturnType<typeof makeSolVerify>;

const makeEvmVerify = (core: MoralisCore, { network, ...options }: VerifyEvmOptions) => {
  return EndpointResolver.create(core, BASE_URL, completeChallengeEvm).fetch({
    message: options.message,
    signature: options.signature,
  });
};

const makeSolVerify = (core: MoralisCore, { network, ...options }: VerifySolOptions) => {
  return EndpointResolver.create(core, BASE_URL, completeChallengeSol).fetch({
    message: options.message,
    signature: options.signature,
  });
};

export const makeVerify = (core: MoralisCore) => (options: VerifyOptions) => {
  switch (options.network) {
    case AuthNetwork.EVM:
      return makeEvmVerify(core, options);
    case AuthNetwork.SOLANA:
      return makeSolVerify(core, options);
    default:
      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(AuthNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
