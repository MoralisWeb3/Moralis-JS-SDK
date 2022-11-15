import Core from '@moralisweb3/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import { getStreamsEvmOperation, GetStreamsEvmRequest } from '../operations';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';

export interface GetStreamsEvmOptions extends GetStreamsEvmRequest {
  networkType?: 'evm';
}

export type GetStreamsOptions = GetStreamsEvmOptions;

export const makeGetStreams = (core: Core, baseUrl: string) => {
  const evmFetcher = new PaginatedOperationResolver(getStreamsEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: GetStreamsOptions) => {
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
