import { Endpoints } from '@moralisweb3/api-utils';
import { getStreamEvm, GetStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetStreamEvmOptions extends GetStreamEvmParams {
  network: 'evm';
}

export type GetStreamOptions = GetStreamEvmOptions;

export const makeGetStreamById = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(getStreamEvm);

  return ({ network, ...options }: GetStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
