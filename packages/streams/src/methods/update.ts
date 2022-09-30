import { Endpoints } from '@moralisweb3/api-utils';
import { updateStreamEvm, UpdateStreamEvmParams } from '../resolvers';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface UpdateStreamEvmOptions extends UpdateStreamEvmParams {
  network: 'evm';
}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

export const makeUpdateStream = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(updateStreamEvm);

  return ({ network, ...options }: UpdateStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
