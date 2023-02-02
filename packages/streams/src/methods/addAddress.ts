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
export type MakeAddAddressAptosStream = (
  addAddressOptions: AddAddressAptosOptions,
) => Promise<AddAddressAptosResponseAdapter>;
export type MakeAddAddressEvmStream = (
  addAddressOptions: AddAddressEvmOptions,
) => Promise<AddAddressEvmResponseAdapter>;

const makeAddAddressAptosStream = (
  core: Core,
  baseUrl: string,
  { networkType, ...options }: AddAddressAptosOptions,
) => {
  return new OperationResolver(addAddressAptosOperation, baseUrl, core).fetch(options);
};

const makeAddAddressEvmStream = (core: Core, baseUrl: string, { networkType, ...options }: AddAddressEvmOptions) => {
  return new OperationResolver(addAddressEvmOperation, baseUrl, core).fetch(options);
};

export const makeAddAddress = (core: Core, baseUrl: string) => {
  return ((addAddressOptions: AddAddressOptions) => {
    switch (addAddressOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeAddAddressAptosStream(core, baseUrl, addAddressOptions);
      case StreamNetwork.EVM:
        return makeAddAddressEvmStream(core, baseUrl, addAddressOptions);
      default:
        if (addAddressOptions.networkType === undefined) {
          return makeAddAddressEvmStream(core, baseUrl, addAddressOptions);
        }
        throw new IncorrectNetworkError(addAddressOptions.networkType);
    }
  }) as MakeAddAddressAptosStream & MakeAddAddressEvmStream;
};
