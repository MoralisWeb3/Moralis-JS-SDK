import { OperationResolver, PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  getAddressesAptosOperation,
  getAddressesEvmOperation,
  GetAddressesAptosRequest,
  GetAddressesAptosResponseAdapter,
  GetAddressesEvmRequest,
  GetAddressesEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import Core from '@moralisweb3/common-core';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface GetAddressesAptosOptions extends GetAddressesAptosRequest, AptosStreamNetworkOptions {}
export interface GetAddressesEvmOptions extends GetAddressesEvmRequest, EvmStreamNetworkOptions {}

export type GetAddressesOptions = GetAddressesAptosOptions | GetAddressesEvmOptions;

export const makeGetAddresses = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(getAddressesAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new PaginatedOperationResolver(getAddressesEvmOperation, baseUrl, core).fetch;

  return ({
    networkType,
    ...options
  }: GetAddressesOptions): Promise<GetAddressesAptosResponseAdapter | GetAddressesEvmResponseAdapter> => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...options });
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
