import { Endpoints } from '@moralisweb3/api-utils';
import { getStreamsEvm, GetStreamsEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetStreamsEvmOptions extends GetStreamsEvmParams {
  networkType?: 'evm';
}

export type GetStreamsOptions = GetStreamsEvmOptions;

export const makeGetStreams = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createPaginatedFetcher(getStreamsEvm);

  return ({ networkType, ...options }: GetStreamsOptions) => {
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
