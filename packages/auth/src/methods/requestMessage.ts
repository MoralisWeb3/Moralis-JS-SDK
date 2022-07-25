import { AuthErrorCode, MoralisAuthError } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { initializeChallengeResolver } from '../resolvers/initializeChallenge';

export enum AuthNetwork {
  EVM = 'evm',
}

// Imported from Swagger and adjusted for better types for Evm
// TODO: generalize and extend generated types
export interface RequestMessageEvmOptions {
  network: 'evm';
  domain: string;
  chain: EvmChainish;
  address: EvmAddressish;
  statement?: string | undefined;
  uri: string;
  // TODO: allow Also Date input (and dates-string)
  expirationTime?: string;
  // TODO: allow Also Date input (and dates-string)
  notBefore?: string;
  resources?: string[] | undefined;
  timeout: number;
}

export type RequestMessageOptions = RequestMessageEvmOptions;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeEvmRequestMessage = ({ chain, address, network, ...options }: RequestMessageEvmOptions) => {
  return initializeChallengeResolver.fetch({
    chainId: EvmChain.create(chain).decimal,
    address: EvmAddress.create(address).checksum,
    ...options,
  });
};

export const makeRequestMessage = () => (options: RequestMessageOptions) => {
  switch (options.network) {
    case 'evm':
      return makeEvmRequestMessage(options);
    default:
      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(AuthNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
