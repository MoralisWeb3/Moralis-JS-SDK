import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import {
  deleteStreamAptosOperation,
  deleteStreamEvmOperation,
  DeleteStreamAptosRequest,
  DeleteStreamEvmRequest,
  DeleteStreamAptosResponseAdapter,
  DeleteStreamEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteStreamAptosOptions extends DeleteStreamAptosRequest, AptosStreamNetworkOptions {}
export interface DeleteStreamEvmOptions extends DeleteStreamEvmRequest, EvmStreamNetworkOptions {}

export type DeleteStreamOptions = DeleteStreamAptosOptions | DeleteStreamEvmOptions;
export type MakeDeleteAptosStream = (
  deleteStreamOptions: DeleteStreamAptosOptions,
) => Promise<DeleteStreamAptosResponseAdapter>;
export type MakeDeleteEvmStream = (
  deleteStreamOptions: DeleteStreamEvmOptions,
) => Promise<DeleteStreamEvmResponseAdapter>;

const makeDeleteAptosStream = (core: Core, baseUrl: string, { networkType, ...options }: DeleteStreamAptosOptions) => {
  return new OperationResolver(deleteStreamAptosOperation, baseUrl, core).fetch(options);
};

const makeDeleteEvmStream = (core: Core, baseUrl: string, { networkType, ...options }: DeleteStreamEvmOptions) => {
  return new OperationResolver(deleteStreamEvmOperation, baseUrl, core).fetch(options);
};

export const makeDeleteStream = (core: Core, baseUrl: string) => {
  return ((deleteStreamOptions: DeleteStreamOptions) => {
    switch (deleteStreamOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeDeleteAptosStream(core, baseUrl, deleteStreamOptions);
      case StreamNetwork.EVM:
        return makeDeleteEvmStream(core, baseUrl, deleteStreamOptions);
      default:
        if (deleteStreamOptions.networkType === undefined) {
          return makeDeleteEvmStream(core, baseUrl, deleteStreamOptions);
        }
        throw new IncorrectNetworkError(deleteStreamOptions.networkType);
    }
  }) as MakeDeleteAptosStream & MakeDeleteEvmStream;
};
