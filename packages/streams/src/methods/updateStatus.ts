import { Endpoints } from '@moralisweb3/api-utils';
import { updateStreamEvmStatus } from '../resolvers/evmStreams/updateStreamEvmStatus';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface UpdateStreamEvmStatusOptions {
  networkType?: 'evm';
  id: string;
  status: 'active' | 'paused' | 'error';
}

export type UpdateStreamStatusOptions = UpdateStreamEvmStatusOptions;

export const makeUpdateStreamStatus = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(updateStreamEvmStatus);

  return ({ networkType, ...options }: UpdateStreamStatusOptions) => {
    switch (networkType) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...options });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
