import { Endpoints } from '@moralisweb3/api-utils';
import { createStreamEvm, CreateStreamEvmParams } from '../resolvers';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface CreateStreamEvmOptions extends CreateStreamEvmParams {
  network: 'evm';
}

export type CreateStreamOptions = CreateStreamEvmOptions;

export const makeCreateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(createStreamEvm);

  return ({ network, ...options }: CreateStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
