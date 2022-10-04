import { Endpoints } from '@moralisweb3/api-utils';
import { updateStreamEvm, UpdateStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface UpdateStreamEvmOptions extends UpdateStreamEvmParams {
  networkType?: 'evm';
}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

export const makeUpdateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(updateStreamEvm);

  return ({ networkType, ...options }: UpdateStreamOptions) => {
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
