import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import {
  deleteAddressEvmOperation,
  DeleteAddressEvmRequest,
  DeleteAddressEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteAddressEvmOptions extends DeleteAddressEvmRequest, CommonStreamNetworkOptions {}
export type DeleteAddressOptions = DeleteAddressEvmOptions;

export const makeDeleteAddress = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(deleteAddressEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: DeleteAddressOptions): Promise<DeleteAddressEvmResponseAdapter> => {
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
