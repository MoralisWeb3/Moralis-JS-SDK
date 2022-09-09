import { BASE_URL } from '../MoralisStreams';
import { PaginatedEndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { getStreamsEvm } from '../resolvers';
export enum StreamNetwork {
  EVM = 'evm',
}

export interface GetStreamsEvmOptions {
  network: 'evm';
  limit: number;
}

export type GetStreamsOptions = GetStreamsEvmOptions;

const makeGetStreamEvm = (core: MoralisCore, { network, ...options }: GetStreamsEvmOptions) => {
  return PaginatedEndpointResolver.create(core, BASE_URL, getStreamsEvm).fetch(options);
};

export const getStreams = (core: MoralisCore) => (options: GetStreamsOptions) => {
  switch (options.network) {
    case StreamNetwork.EVM:
      return makeGetStreamEvm(core, options);
    default:
      throw new MoralisStreamError({
        code: StreamErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(StreamNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
