import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  updateStreamAptosOperation,
  UpdateStreamAptosRequest,
  updateStreamEvmOperation,
  UpdateStreamEvmRequest,
} from '@moralisweb3/common-streams-utils';
import Core from '@moralisweb3/common-core';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamAptosOptions extends UpdateStreamAptosRequest, AptosStreamNetworkOptions {}
export interface UpdateStreamEvmOptions extends UpdateStreamEvmRequest, EvmStreamNetworkOptions {}

export type UpdateStreamOptions = UpdateStreamAptosOptions | UpdateStreamEvmOptions;

export const makeUpdateStream = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(updateStreamAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(updateStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamOptions) => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...(options as UpdateStreamAptosRequest) });
      case StreamNetwork.EVM:
        return evmFetcher({ ...(options as UpdateStreamEvmRequest) });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...(options as UpdateStreamEvmRequest) });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
