import { BASE_URL } from '../MoralisStreams';
import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { updateStreamEvmStatus } from '../resolvers/updateStreamEvmStatus';
export enum StreamNetwork {
  EVM = 'evm',
}

export interface UpdateStreamEvmStatusOptions {
  network: 'evm';
  id: string;
  status: 'active' | 'paused' | 'error';
}

export type UpdateStreamStatusOptions = UpdateStreamEvmStatusOptions;

const makeUpdateStreamEvmStatus = (core: MoralisCore, { network, ...options }: UpdateStreamStatusOptions) => {
  return EndpointResolver.create(core, BASE_URL, updateStreamEvmStatus).fetch(options);
};

export const updateStreamStatus = (core: MoralisCore) => (options: UpdateStreamStatusOptions) => {
  switch (options.network) {
    case StreamNetwork.EVM:
      return makeUpdateStreamEvmStatus(core, options);
    default:
      throw new MoralisStreamError({
        code: StreamErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.network}", Valid values are: ${Object.values(StreamNetwork)
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
