import { Endpoints } from '@moralisweb3/api-utils';
import { deleteAddressEvm, DeleteAddressEvmParams } from '../resolvers/evmStreams/deleteAddressEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface DeleteAddressEvmOptions extends DeleteAddressEvmParams {
  networkType?: 'evm';
}

export type DeleteAddressOptions = DeleteAddressEvmOptions;

export const makeDeleteAddress = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(deleteAddressEvm);

  return ({ networkType, ...options }: DeleteAddressOptions) => {
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
