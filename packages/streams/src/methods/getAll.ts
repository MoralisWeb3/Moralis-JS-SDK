import { Endpoints } from '@moralisweb3/api-utils';
import { getStreamsEvm, GetStreamsEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetStreamsEvmOptions extends GetStreamsEvmParams {
  network: 'evm';
}

export type GetStreamsOptions = GetStreamsEvmOptions;

export const makeGetStreams = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createPaginatedFetcher(getStreamsEvm);

  return ({ network, ...options }: GetStreamsOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
