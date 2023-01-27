import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import {
  createStreamAptosOperation,
  createStreamEvmOperation,
  CreateStreamAptosRequest,
  CreateStreamEvmRequest,
} from '@moralisweb3/common-streams-utils';

import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface CreateStreamAptosOptions extends CreateStreamAptosRequest, AptosStreamNetworkOptions {}
export interface CreateStreamEvmOptions extends CreateStreamEvmRequest, EvmStreamNetworkOptions {}

export type CreateStreamOptions = CreateStreamAptosOptions | CreateStreamEvmOptions;

export const makeCreateStream = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(createStreamAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(createStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, ...options }: CreateStreamOptions) => {
    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...(options as CreateStreamAptosRequest) });
      case StreamNetwork.EVM:
        return evmFetcher({ ...(options as CreateStreamEvmRequest) });
      default:
        if (networkType === undefined) {
          return evmFetcher({ ...(options as CreateStreamEvmRequest) });
        }
        throw new IncorrectNetworkError(networkType);
    }
  };
};
