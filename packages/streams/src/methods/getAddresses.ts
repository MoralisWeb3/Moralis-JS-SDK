import { Endpoints } from '@moralisweb3/api-utils';
import { getAddressesEvm, GetAddressesEvmParams } from '../resolvers/evmStreams/getAddressesEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetAddressesEvmOptions extends GetAddressesEvmParams {
  network: 'evm';
}

export type GetAddressesOptions = GetAddressesEvmOptions;

export const makeGetAddresses = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createPaginatedFetcher(getAddressesEvm);

  return ({ network, ...options }: GetAddressesOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
