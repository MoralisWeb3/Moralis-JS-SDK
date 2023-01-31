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
export type MakeGetAddressesAptos = (
  getAddressesOptions: GetAddressesAptosOptions,
) => Promise<GetAddressesAptosResponseAdapter>;
export type MakeGetAddressesEvm = (
  getAddressesOptions: GetAddressesEvmOptions,
) => Promise<GetAddressesEvmResponseAdapter>;

const makeGetAptosAddresses = (core: Core, baseUrl: string, { networkType, ...options }: GetAddressesAptosOptions) => {
  return new OperationResolver(getAddressesAptosOperation, baseUrl, core).fetch(options);
};

const makeGetEvmAddresses = (core: Core, baseUrl: string, { networkType, ...options }: GetAddressesEvmOptions) => {
  return new PaginatedOperationResolver(getAddressesEvmOperation, baseUrl, core).fetch(options);
};

export const makeGetAddresses = (core: Core, baseUrl: string) => {
  return ((getAddressesOptions: GetAddressesOptions) => {
    switch (getAddressesOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeGetAptosAddresses(core, baseUrl, getAddressesOptions);
      case StreamNetwork.EVM:
        return makeGetEvmAddresses(core, baseUrl, getAddressesOptions);
      default:
        if (getAddressesOptions.networkType === undefined) {
          return makeGetEvmAddresses(core, baseUrl, getAddressesOptions);
        }
        throw new IncorrectNetworkError(getAddressesOptions.networkType);
    }
  }) as MakeGetAddressesAptos & MakeGetAddressesEvm;
};
