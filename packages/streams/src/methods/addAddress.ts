import { Endpoints } from '@moralisweb3/api-utils';
import { addAddressEvm } from '../resolvers';
import { AddAddressEvmParams } from '../resolvers/evmStreams/addAddressEvm';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface AddAddressEvmOptions extends AddAddressEvmParams {
  networkType?: 'evm';
}

export type AddAddressOptions = AddAddressEvmOptions;

export const makeAddAddress = (endpoints: Endpoints) => {
  const evmFetcher = endpoints.createFetcher(addAddressEvm);

  return ({ networkType, ...options }: AddAddressOptions) => {
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
