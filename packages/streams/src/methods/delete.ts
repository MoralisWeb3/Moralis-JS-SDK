import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import {
  deleteStreamAptosOperation,
  deleteStreamEvmOperation,
  DeleteStreamAptosRequest,
  DeleteStreamEvmRequest,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteStreamAptosOptions extends DeleteStreamAptosRequest, AptosStreamNetworkOptions {}
export interface DeleteStreamEvmOptions extends DeleteStreamEvmRequest, EvmStreamNetworkOptions {}

export type DeleteStreamOptions = DeleteStreamAptosOptions | DeleteStreamEvmOptions;

export const makeDeleteStream = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(deleteStreamAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(deleteStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: DeleteStreamOptions) => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...options });
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
