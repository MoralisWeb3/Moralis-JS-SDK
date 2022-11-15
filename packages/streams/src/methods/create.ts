import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import { createStreamEvmOperation, CreateStreamEvmRequest } from '../operations';

import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface CreateStreamEvmOptions extends CreateStreamEvmRequest {
  networkType?: 'evm';
}

export type CreateStreamOptions = CreateStreamEvmOptions;

export const makeCreateStream = (core: Core, baseUrl: string) => {
  const fetcher = new OperationResolver(createStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: CreateStreamOptions) => {
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
