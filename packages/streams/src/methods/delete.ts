import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import Core from '@moralisweb3/common-core';
import { deleteStreamEvmOperation, DeleteStreamEvmRequest } from '@moralisweb3/common-streams-utils';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface DeleteStreamEvmOptions extends DeleteStreamEvmRequest, CommonStreamNetworkOptions {}
export type DeleteStreamOptions = DeleteStreamEvmOptions;

export const makeDeleteStream = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(deleteStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: DeleteStreamOptions) => {
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
