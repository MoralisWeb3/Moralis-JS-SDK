import { OperationResolver } from '@moralisweb3/api-utils';
import Core, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/common-core';
import { BASE_URL } from '../Auth';
import { verifyChallengeSolanaOperation, verifyChallengeEvmOperation, verifyChallengeAptosOperation } from '@moralisweb3/common-auth-utils';
import { AuthNetworkType } from '../utils/AuthNetworkType';

export interface VerifyEvmOptions {
  networkType?: 'evm';
  /**
   * @deprecated use networkType instead
   */
  network?: 'evm';
  message: string;
  signature: string;
}

export interface VerifySolOptions {
  networkType: 'solana';
  /**
   * @deprecated use networkType instead
   */
  network?: 'solana';
  message: string;
  signature: string;
}

export interface VerifyAptosOptions {
  networkType: 'aptos';
  message: string;
  signature: string;
}

export type VerifyOptions = VerifyEvmOptions | VerifySolOptions | VerifyAptosOptions

const makeEvmVerify = (core: Core, { networkType, network, ...options }: VerifyEvmOptions) => {
  return new OperationResolver(verifyChallengeEvmOperation, BASE_URL, core).fetch({
    message: options.message,
    signature: options.signature,
  });
};

const makeSolVerify = (core: Core, { networkType, network, ...options }: VerifySolOptions) => {
  return new OperationResolver(verifyChallengeSolanaOperation, BASE_URL, core).fetch({
    message: options.message,
    signature: options.signature,
  });
};

const makeAptosVerify = (core: Core, { networkType, ...options }: VerifyAptosOptions) => {
  return new OperationResolver(verifyChallengeAptosOperation, BASE_URL, core).fetch({
    message: options.message,
    signature: options.signature,
  });
};


export const makeVerify = (core: Core) => async (options: VerifyOptions) => {
  // Backwards compatibility for the 'network' parameter
  if (!options.networkType && options.network) {
    options.networkType = options.network;
  }

  switch (options.networkType) {
    case AuthNetworkType.EVM:
      return makeEvmVerify(core, options);
    case AuthNetworkType.SOLANA:
      return makeSolVerify(core, options);
    case AuthNetworkType.APTOS:
      return makeAptosVerify(core, options)
    default:
      if (!options.networkType) {
        return makeEvmVerify(core, options);
      }

      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.networkType}", Valid values are: ${Object.values(
          AuthNetworkType,
        )
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
