import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import { updateStreamStatusEvmOperation, UpdateStreamStatusEvmRequest } from '../operations';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface UpdateStreamEvmStatusOptions extends UpdateStreamStatusEvmRequest {
  networkType?: 'evm';
}

export type UpdateStreamStatusOptions = UpdateStreamEvmStatusOptions;

export const makeUpdateStreamStatus = (core: Core, baseUrl: string) => {
  const fetcher = new OperationResolver(updateStreamStatusEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamStatusOptions) => {
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
