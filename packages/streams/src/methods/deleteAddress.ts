import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import { deleteAddressEvmOperation, DeleteAddressEvmRequest } from '@moralisweb3/common-streams-utils';

export interface DeleteAddressEvmOptions extends DeleteAddressEvmRequest {
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
