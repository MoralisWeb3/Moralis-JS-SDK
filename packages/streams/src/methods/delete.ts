import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import { deleteStreamEvmOperation, DeleteStreamEvmRequest } from '@moralisweb3/common-streams-utils';

export interface DeleteStreamEvmOptions extends DeleteStreamEvmRequest {
  networkType?: 'evm';
}

export type DeleteStreamOptions = DeleteStreamEvmOptions;

export const makeDeleteStream = (core: Core, baseUrl: string) => {
  const fetcher = new OperationResolver(deleteStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: DeleteStreamOptions) => {
    switch (networkType) {
      case StreamNetwork.EVM:
        return fetcher({ ...options });
      default:
        if (networkType === undefined) {
          return fetcher({ ...options });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
