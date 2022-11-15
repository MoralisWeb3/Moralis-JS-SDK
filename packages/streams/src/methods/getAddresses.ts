import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { getAddressesEvmOperation, GetAddressesEvmRequest } from '../operations';
import Core from '@moralisweb3/common-core';

export interface GetAddressesEvmOptions extends GetAddressesEvmRequest {
  networkType?: 'evm';
}

export type GetAddressesOptions = GetAddressesEvmOptions;

export const makeGetAddresses = (core: Core, baseUrl: string) => {
  const evmFetcher = new PaginatedOperationResolver(getAddressesEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: GetAddressesOptions) => {
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
