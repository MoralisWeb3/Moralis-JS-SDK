import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { updateStreamEvmOperation, UpdateStreamEvmRequest } from '@moralisweb3/common-streams-utils';
import Core from '@moralisweb3/common-core';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamEvmOptions extends UpdateStreamEvmRequest, CommonStreamNetworkOptions {}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

export const makeUpdateStream = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(updateStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamOptions) => {
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
