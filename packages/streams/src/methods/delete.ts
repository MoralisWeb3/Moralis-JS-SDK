import { Endpoints } from '@moralisweb3/api-utils';
import { deleteStreamEvm, DeleteStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface DeleteStreamEvmOptions extends DeleteStreamEvmParams {
  networkType?: 'evm';
}

export type DeleteStreamOptions = DeleteStreamEvmOptions;

export const makeDeleteStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(deleteStreamEvm);

  return ({ networkType, ...options }: DeleteStreamOptions) => {
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
