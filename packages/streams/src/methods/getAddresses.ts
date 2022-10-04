import { Endpoints } from '@moralisweb3/api-utils';
import { getAddressesEvm, GetAddressesEvmParams } from '../resolvers/evmStreams/getAddressesEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetAddressesEvmOptions extends GetAddressesEvmParams {
  networkType?: 'evm';
}

export type GetAddressesOptions = GetAddressesEvmOptions;

export const makeGetAddresses = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createPaginatedFetcher(getAddressesEvm);

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
