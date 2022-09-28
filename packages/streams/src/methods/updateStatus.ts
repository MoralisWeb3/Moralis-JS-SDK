import { Endpoints } from '@moralisweb3/api-utils';
import { updateStreamEvmStatus } from '../resolvers/evmStreams/updateStreamEvmStatus';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface UpdateStreamEvmStatusOptions {
  network: 'evm';
  id: string;
  status: 'active' | 'paused' | 'error';
}

export type UpdateStreamStatusOptions = UpdateStreamEvmStatusOptions;

export const makeUpdateStreamStatus = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(updateStreamEvmStatus);

  return ({ network, ...options }: UpdateStreamStatusOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
