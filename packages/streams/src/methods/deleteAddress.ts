import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import {
  deleteAddressAptosOperation,
  DeleteAddressAptosRequest,
  DeleteAddressAptosResponseAdapter,
  deleteAddressEvmOperation,
  DeleteAddressEvmRequest,
  DeleteAddressEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteAddressAptosOptions extends DeleteAddressAptosRequest, AptosStreamNetworkOptions {}
export interface DeleteAddressEvmOptions extends DeleteAddressEvmRequest, EvmStreamNetworkOptions {}

export type DeleteAddressOptions = DeleteAddressAptosOptions | DeleteAddressEvmOptions;
export type MakeDeleteAddressAptosStream = (
  deleteAddressOptions: DeleteAddressAptosOptions,
) => Promise<DeleteAddressAptosResponseAdapter>;
export type MakeDeleteAddressEvmStream = (
  deleteAddressOptions: DeleteAddressEvmOptions,
) => Promise<DeleteAddressEvmResponseAdapter>;

const makeDeleteAddressAptosStream = (
  core: Core,
  baseUrl: string,
  { networkType, ...options }: DeleteAddressAptosOptions,
) => {
  return new OperationResolver(deleteAddressAptosOperation, baseUrl, core).fetch(options);
};

const makeDeleteAddressEvmStream = (
  core: Core,
  baseUrl: string,
  { networkType, ...options }: DeleteAddressEvmOptions,
) => {
  return new OperationResolver(deleteAddressEvmOperation, baseUrl, core).fetch(options);
};

export const makeDeleteAddress = (core: Core, baseUrl: string) => {
  return ((deleteAddressOptions: DeleteAddressOptions) => {
    switch (deleteAddressOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeDeleteAddressAptosStream(core, baseUrl, deleteAddressOptions);
      case StreamNetwork.EVM:
        return makeDeleteAddressEvmStream(core, baseUrl, deleteAddressOptions);
      default:
        if (deleteAddressOptions.networkType === undefined) {
          return makeDeleteAddressEvmStream(core, baseUrl, deleteAddressOptions);
        }
        throw new IncorrectNetworkError(deleteAddressOptions.networkType);
    }
  }) as MakeDeleteAddressAptosStream & MakeDeleteAddressEvmStream;
};
