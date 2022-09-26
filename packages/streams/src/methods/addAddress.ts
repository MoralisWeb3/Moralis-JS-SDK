import { Endpoints } from '@moralisweb3/api-utils';
import { addAddressEvm } from '../resolvers';
import { AddAddressEvmParams } from '../resolvers/evmStreams/addAddressEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface AddAddressEvmOptions extends AddAddressEvmParams {
  network: 'evm';
}

export type AddAddressOptions = AddAddressEvmOptions;

export const makeAddAddress = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(addAddressEvm);

  return ({ network, ...options }: AddAddressOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
