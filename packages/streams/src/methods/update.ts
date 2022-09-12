import { BASE_URL } from '../MoralisStreams';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { EvmAddressish, EvmChainish } from '@moralisweb3/evm-utils';
import { updateStreamEvm } from '../resolvers';
export enum StreamNetwork {
  EVM = 'evm',
}

export interface UpdateStreamEvmOptions {
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
  id: string;
}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

const makeUpdateStreamEvm = (core: MoralisCore, { network, ...options }: UpdateStreamEvmOptions) => {
  return EndpointResolver.create(core, BASE_URL, updateStreamEvm).fetch(options);
};

export const updateStream = (core: MoralisCore) => (options: UpdateStreamOptions) => {
  switch (options.network) {
    case StreamNetwork.EVM:
      return makeUpdateStreamEvm(core, options);
    default:
      throw new MoralisStreamError({
        code: StreamErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(StreamNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
