import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import {
  deleteAddressAptosOperation,
  DeleteAddressAptosRequest,
  DeleteAddressAptosResponseAdapter,
  deleteAddressEvmOperation,
  DeleteAddressEvmRequest,
  DeleteAddressEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteAddressAptosOptions extends DeleteAddressAptosRequest, AptosStreamNetworkOptions {}
export interface DeleteAddressEvmOptions extends DeleteAddressEvmRequest, EvmStreamNetworkOptions {}

export type DeleteAddressOptions = DeleteAddressAptosOptions | DeleteAddressEvmOptions;

export const makeDeleteAddress = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(deleteAddressAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(deleteAddressEvmOperation, baseUrl, core).fetch;

  return ({
    networkType,
    ...options
  }: DeleteAddressOptions): Promise<DeleteAddressAptosResponseAdapter | DeleteAddressEvmResponseAdapter> => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...(options as DeleteAddressAptosRequest) });
      case StreamNetwork.EVM:
        return evmFetcher({ ...(options as DeleteAddressEvmRequest) });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...(options as DeleteAddressEvmRequest) });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
