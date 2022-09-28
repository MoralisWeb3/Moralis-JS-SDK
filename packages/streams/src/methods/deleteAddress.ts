import { Endpoints } from '@moralisweb3/api-utils';
import { deleteAddressEvm, DeleteAddressEvmParams } from '../resolvers/evmStreams/deleteAddressEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface DeleteAddressEvmOptions extends DeleteAddressEvmParams {
  network: 'evm';
}

export type DeleteAddressOptions = DeleteAddressEvmOptions;

export const makeDeleteAddress = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(deleteAddressEvm);

  return ({ network, ...options }: DeleteAddressOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
