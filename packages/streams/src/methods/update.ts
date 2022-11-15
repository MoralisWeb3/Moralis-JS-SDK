import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { updateStreamEvmOperation, UpdateStreamEvmRequest } from '../operations';
import Core from '@moralisweb3/common-core';

export interface UpdateStreamEvmOptions extends UpdateStreamEvmRequest {
  networkType?: 'evm';
}

export type UpdateStreamOptions = UpdateStreamEvmOptions;

export const makeUpdateStream = (core: Core, baseUrl: string) => {
  const fetcher = new OperationResolver(updateStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: UpdateStreamOptions) => {
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
