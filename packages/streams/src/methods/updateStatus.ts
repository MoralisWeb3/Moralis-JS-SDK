import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import {
  updateStreamStatusAptosOperation,
  UpdateStreamStatusAptosRequest,
  updateStreamStatusEvmOperation,
  UpdateStreamStatusEvmRequest,
} from '@moralisweb3/common-streams-utils';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamAptosStatusOptions extends UpdateStreamStatusAptosRequest, AptosStreamNetworkOptions {}
export interface UpdateStreamEvmStatusOptions extends UpdateStreamStatusEvmRequest, EvmStreamNetworkOptions {}

export type UpdateStreamStatusOptions = UpdateStreamAptosStatusOptions | UpdateStreamEvmStatusOptions;

export const makeUpdateStreamStatus = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(updateStreamStatusAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(updateStreamStatusEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamStatusOptions) => {
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
