import { SolAddressish, SolNetworkish, SolAddress, SolNetwork } from '@moralisweb3/sol-utils';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../MoralisAuth';
import { initializeChallengeEvm, initializeChallengeSol } from '../resolvers';

export enum AuthNetwork {
  EVM = 'evm',
  SOLANA = 'solana',
}

// Imported from Swagger and adjusted for better types for Evm
// TODO: generalize and extend generated types
export interface RequestMessageEvmOptions {
  network: 'evm';
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
  network: 'solana';
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

// Temporary solution to allow allow chain id enum generated from swagger
type ChainID =
  | '1'
  | '3'
  | '4'
  | '5'
  | '25'
  | '42'
  | '56'
  | '97'
  | '137'
  | '250'
  | '338'
  | '1337'
  | '43113'
  | '43114'
  | '80001';

export type RequestMessageOptions = RequestMessageEvmOptions | RequestMessageSolOptions;

const makeEvmRequestMessage = (
  core: MoralisCore,
  { chain, address, network, ...options }: RequestMessageEvmOptions,
) => {
  return EndpointResolver.create(core, BASE_URL, initializeChallengeEvm).fetch({
    // TODO: remove this when the API is fixed
    chainId: EvmChain.create(chain).decimal.toString() as ChainID,
    address: EvmAddress.create(address).checksum,
    ...options,
  });
};

const makeSolRequestMessage = (
  core: MoralisCore,
  { address, solNetwork, network, ...options }: RequestMessageSolOptions,
) => {
  return EndpointResolver.create(core, BASE_URL, initializeChallengeSol).fetch({
    network: SolNetwork.create(solNetwork).network,
    address: SolAddress.create(address).toString(),
    ...options,
  });
};

export const makeRequestMessage = (core: MoralisCore) => (options: RequestMessageOptions) => {
  switch (options.network) {
    case AuthNetwork.EVM:
      return makeEvmRequestMessage(core, options);
    case AuthNetwork.SOLANA:
      return makeSolRequestMessage(core, options);
    default:
      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(AuthNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
