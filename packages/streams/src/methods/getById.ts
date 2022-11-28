import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { getStreamEvmOperation, GetStreamEvmRequest } from '@moralisweb3/common-streams-utils';

export interface GetStreamEvmOptions extends GetStreamEvmRequest {
  network: 'evm';
}

export type GetStreamOptions = GetStreamEvmOptions;

export const makeGetStreamById = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(getStreamEvmOperation, baseUrl, core).fetch;

  return ({ network, ...options }: GetStreamOptions) => {
    switch (network) {
      case StreamNetwork.EVM:
        return evmFetcher({ ...options });
      default:
        throw new IncorrectNetworkError(network);
    }
  };
};
