import { BASE_URL } from '../MoralisStreams';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { createStreamEvm } from '../resolvers';
export enum StreamNetwork {
  EVM = 'evm',
}

export interface CreateStreamEvmOptions {
  network: 'evm';
  webhookUrl: string;
  description: string;
  tag: string;
  tokenAddress?: EvmAddressish;
  includeNativeTxs?: boolean;
  topic0?: string;
  abi?: {
    [key: string]: unknown;
  };
  filter?: {
    [key: string]: unknown;
  };
  address?: EvmAddressish;
  chains: EvmChainish[];
  type: 'wallet' | 'contract';
}

export type CreateStreamOptions = CreateStreamEvmOptions;

const makeCreateStreamEvm = (core: MoralisCore, { network, ...options }: CreateStreamEvmOptions) => {
  return EndpointResolver.create(core, BASE_URL, createStreamEvm).fetch(options);
};

export const createStream = (core: MoralisCore) => (options: CreateStreamOptions) => {
  switch (options.network) {
    case StreamNetwork.EVM:
      return makeCreateStreamEvm(core, options);
    default:
      throw new MoralisStreamError({
        code: StreamErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(StreamNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
