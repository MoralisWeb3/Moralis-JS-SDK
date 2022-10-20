import { SolAddressish, SolNetworkish, SolAddress, SolNetwork } from '@moralisweb3/common-sol-utils';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { BASE_URL } from '../MoralisAuth';
import { initializeChallengeEvm, initializeChallengeSol } from '../resolvers';
import { AuthNetworkType } from '../utils/AuthNetworkType';

// Imported from Swagger and adjusted for better types for Evm
// TODO: generalize and extend generated types
export interface RequestMessageEvmOptions {
  networkType?: 'evm';
  /**
   * @deprecared use networkType instead
   */
  network?: 'evm';
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
  /**
   * @deprecared use networkType instead
   */
  network?: 'solana';
  domain: string;
  solNetwork: SolNetworkish;
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

export type RequestMessageOptions = RequestMessageEvmOptions | RequestMessageSolOptions;

const makeEvmRequestMessage = (
  core: MoralisCore,
  { chain, address, networkType, network, ...options }: RequestMessageEvmOptions,
) => {
  return EndpointResolver.create(core, BASE_URL, initializeChallengeEvm).fetch({
    chainId: EvmChain.create(chain).apiId,
    address: EvmAddress.create(address).checksum,
    ...options,
  });
};

const makeSolRequestMessage = (
  core: MoralisCore,
  { address, solNetwork, networkType, network, ...options }: RequestMessageSolOptions,
) => {
  return EndpointResolver.create(core, BASE_URL, initializeChallengeSol).fetch({
    network: SolNetwork.create(solNetwork).network,
    address: SolAddress.create(address).toString(),
    ...options,
  });
};

export const makeRequestMessage = (core: MoralisCore) => async (options: RequestMessageOptions) => {
  // Backwards compatibility for the 'network' parameter
  if (!options.networkType && options.network) {
    options.networkType = options.network;
  }

  switch (options.networkType) {
    case AuthNetworkType.EVM:
      return makeEvmRequestMessage(core, options);
    case AuthNetworkType.SOLANA:
      return makeSolRequestMessage(core, options);
    default:
      if (!options.networkType) {
        return makeEvmRequestMessage(core, options);
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
