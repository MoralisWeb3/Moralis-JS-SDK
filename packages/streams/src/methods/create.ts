import { Endpoints } from '@moralisweb3/api-utils';
import { createStreamEvm, CreateStreamEvmParams } from '../resolvers';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface CreateStreamEvmOptions extends CreateStreamEvmParams {
  networkType?: 'evm';
}

export type CreateStreamOptions = CreateStreamEvmOptions;

export const makeCreateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(createStreamEvm);

  return ({ networkType, ...options }: CreateStreamOptions) => {
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
