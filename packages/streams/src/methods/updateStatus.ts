import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import { updateStreamStatusEvmOperation, UpdateStreamStatusEvmRequest } from '@moralisweb3/common-streams-utils';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamEvmStatusOptions extends UpdateStreamStatusEvmRequest, CommonStreamNetworkOptions {}

export type UpdateStreamStatusOptions = UpdateStreamEvmStatusOptions;

export const makeUpdateStreamStatus = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(updateStreamStatusEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamStatusOptions) => {
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
