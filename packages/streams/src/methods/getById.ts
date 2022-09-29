import { Endpoints } from '@moralisweb3/api-utils';
import { getStreamEvm, GetStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetStreamsEvmOptions extends GetStreamEvmParams {
  network: 'evm';
}

export type GetStreamsOptions = GetStreamsEvmOptions;

export const makeGetStreamById = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(getStreamEvm);

  return ({ network, ...options }: GetStreamsOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
