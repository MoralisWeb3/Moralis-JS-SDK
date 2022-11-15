import { OperationResolver } from '@moralisweb3/api-utils';
import { DeleteAddressEvmParams } from '../resolvers/evmStreams/deleteAddressEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import { deleteAddressEvmOperation } from '../operations';

export interface DeleteAddressEvmOptions extends DeleteAddressEvmParams {
  networkType?: 'evm';
}

export type DeleteAddressOptions = DeleteAddressEvmOptions;

export const makeDeleteAddress = (core: Core, baseUrl: string) => {
  const fetcher = new OperationResolver(deleteAddressEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: DeleteAddressOptions) => {
    switch (networkType) {
      case StreamNetwork.EVM:
        return fetcher({ ...options });
      default:
        if (networkType === undefined) {
          return fetcher({ ...options });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
