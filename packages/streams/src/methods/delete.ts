import { BASE_URL } from '../MoralisStreams';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { deleteStreamEvm } from '../resolvers';
export enum StreamNetwork {
  EVM = 'evm',
}

export interface DeleteStreamEvmOptions {
  network: 'evm';
  id: string;
}

export type DeleteStreamOptions = DeleteStreamEvmOptions;

const makeDeleteStreamEvm = (core: MoralisCore, { network, ...options }: DeleteStreamEvmOptions) => {
  return EndpointResolver.create(core, BASE_URL, deleteStreamEvm).fetch(options);
};

export const deleteStream = (core: MoralisCore) => (options: DeleteStreamOptions) => {
  switch (options.network) {
    case StreamNetwork.EVM:
      return makeDeleteStreamEvm(core, options);
    default:
      throw new MoralisStreamError({
        code: StreamErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(StreamNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
