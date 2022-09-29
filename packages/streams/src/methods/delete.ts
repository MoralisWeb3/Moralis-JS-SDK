import { Endpoints } from '@moralisweb3/api-utils';
import { deleteStreamEvm, DeleteStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface DeleteStreamEvmOptions extends DeleteStreamEvmParams {
  network: 'evm';
}

export type DeleteStreamOptions = DeleteStreamEvmOptions;

export const makeDeleteStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(deleteStreamEvm);

  return ({ network, ...options }: DeleteStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
