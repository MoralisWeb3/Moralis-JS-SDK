import { SolAddressish, SolNetworkish, SolAddress } from '@moralisweb3/common-sol-utils';
import { OperationResolver } from '@moralisweb3/api-utils';
import Core, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { BASE_URL } from '../Auth';
import { AuthNetworkType } from '../utils/AuthNetworkType';
import {
  requestChallengeSolanaOperation,
  requestChallengeEvmOperation,
  requestChallengeAptosOperation,
} from '@moralisweb3/common-auth-utils';
import { AptosAddress, AptosAddressInput, AptosNetworkInput } from '@moralisweb3/common-aptos-utils';

// Imported from Swagger and adjusted for better types for Evm
// TODO: generalize and extend generated types
export interface RequestMessageEvmOptions {
  networkType?: 'evm';
  domain: string;
  chain: EvmChainish;
  address: EvmAddressish;
  statement?: string;
  uri: string;
  // TODO: allow Also Date input (and dates-string)
  expirationTime?: string;
  // TODO: allow Also Date input (and dates-string)
  notBefore?: string;
  resources?: string[];
  timeout: number;
}
export interface RequestMessageSolOptions {
  networkType: 'solana';
  domain: string;
  /**
   * @deprecated use `network` instead
   */
  solNetwork?: SolNetworkish;
  network: SolNetworkish;
  address: SolAddressish;
  statement?: string;
  uri: string;
  // TODO: allow Also Date input (and dates-string)
  expirationTime?: string;
  // TODO: allow Also Date input (and dates-string)
  notBefore?: string;
  resources?: string[];
  timeout: number;
}

export interface RequestMessageAptosOptions {
  networkType: 'aptos';
  domain: string;
  network: AptosNetworkInput;
  address: AptosAddressInput;
  publicKey: string;
  statement?: string;
  uri: string;
  // TODO: allow Also Date input (and dates-string)
  expirationTime?: string;
  // TODO: allow Also Date input (and dates-string)
  notBefore?: string;
  resources?: string[];
  timeout: number;
}

export type RequestMessageOptions = RequestMessageEvmOptions | RequestMessageSolOptions | RequestMessageAptosOptions;

const makeEvmRequestMessage = (core: Core, { chain, address, networkType, ...options }: RequestMessageEvmOptions) => {
  return new OperationResolver(requestChallengeEvmOperation, BASE_URL, core).fetch({
    chainId: EvmChain.create(chain).hex,
    address: EvmAddress.create(address).checksum,
    ...options,
  });
};

const makeSolRequestMessage = (
  core: Core,
  { address, networkType, solNetwork, ...options }: RequestMessageSolOptions,
) => {
  // Backwards compatibility for 'solNetwork' option
  if (!options.network && solNetwork) {
    options.network = solNetwork;
  }
  return new OperationResolver(requestChallengeSolanaOperation, BASE_URL, core).fetch({
    address: SolAddress.create(address).toString(),
    ...options,
  });
};

const makeAptosRequestMessage = (core: Core, { address, networkType, ...options }: RequestMessageAptosOptions) => {
  return new OperationResolver(requestChallengeAptosOperation, BASE_URL, core).fetch({
    address: AptosAddress.create(address).toString(),
    ...options,
  });
};

export const makeRequestMessage = (core: Core) => async (options: RequestMessageOptions) => {
  switch (options.networkType) {
    case AuthNetworkType.EVM:
      return makeEvmRequestMessage(core, options);
    case AuthNetworkType.SOLANA:
      return makeSolRequestMessage(core, options);
    case AuthNetworkType.APTOS:
      return makeAptosRequestMessage(core, options);
    default:
      if (!options.networkType) {
        return makeEvmRequestMessage(core, options);
      }

      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect networkType provided. Got "${options.networkType}", Valid values are: ${Object.values(
          AuthNetworkType,
        )
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
