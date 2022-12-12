import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  addAddressEvmOperation,
  AddAddressEvmRequest,
  AddAddressEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';

export interface AddAddressEvmOptions extends AddAddressEvmRequest {
  networkType?: 'evm';
}

export type AddAddressOptions = AddAddressEvmOptions;

export const makeAddAddress = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(addAddressEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: AddAddressOptions): Promise<AddAddressEvmResponseAdapter> => {
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
