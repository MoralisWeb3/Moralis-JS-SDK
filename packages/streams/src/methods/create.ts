import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import { createStreamEvmOperation, CreateStreamEvmRequest } from '@moralisweb3/common-streams-utils';

import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface CreateStreamEvmOptions extends CreateStreamEvmRequest, CommonStreamNetworkOptions {}

export type CreateStreamOptions = CreateStreamEvmOptions;

export const makeCreateStream = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(createStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: CreateStreamOptions) => {
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
