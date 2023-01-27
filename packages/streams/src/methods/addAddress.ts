import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  addAddressAptosOperation,
  addAddressEvmOperation,
  AddAddressAptosRequest,
  AddAddressAptosResponseAdapter,
  AddAddressEvmRequest,
  AddAddressEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface AddAddressAptosOptions extends AddAddressAptosRequest, AptosStreamNetworkOptions {}
export interface AddAddressEvmOptions extends AddAddressEvmRequest, EvmStreamNetworkOptions {}

export type AddAddressOptions = AddAddressAptosOptions | AddAddressEvmOptions;

export const makeAddAddress = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(addAddressAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(addAddressEvmOperation, baseUrl, core).fetch;

  return ({
    networkType,
    ...options
  }: AddAddressOptions): Promise<AddAddressAptosResponseAdapter | AddAddressEvmResponseAdapter> => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...(options as AddAddressAptosRequest) });
      case StreamNetwork.EVM:
        return evmFetcher({ ...(options as AddAddressEvmOptions) });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...(options as AddAddressEvmOptions) });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
