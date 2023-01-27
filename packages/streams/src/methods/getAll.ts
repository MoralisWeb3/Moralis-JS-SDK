import Core from '@moralisweb3/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import {
  getStreamsAptosOperation,
  getStreamsEvmOperation,
  GetStreamsAptosRequest,
  GetStreamsEvmRequest,
} from '@moralisweb3/common-streams-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface GetStreamsAptosOptions extends GetStreamsAptosRequest, AptosStreamNetworkOptions {}
export interface GetStreamsEvmOptions extends GetStreamsEvmRequest, EvmStreamNetworkOptions {}

export type GetStreamsOptions = GetStreamsAptosOptions | GetStreamsEvmOptions;

export const makeGetStreams = (core: Core, baseUrl: string) => {
  const aptosFetcher = new PaginatedOperationResolver(getStreamsAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new PaginatedOperationResolver(getStreamsEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: GetStreamsOptions) => {
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
