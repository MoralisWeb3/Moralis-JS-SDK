import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork, StreamNetworkUnion } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { getStreamEvmOperation, GetStreamEvmRequest } from '@moralisweb3/common-streams-utils';
import { CommonStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface GetStreamEvmOptions extends GetStreamEvmRequest, CommonStreamNetworkOptions {
  /** @deprecared use networkType instead */
  network?: StreamNetworkUnion;
}

export type GetStreamOptions = GetStreamEvmOptions;

export const makeGetStreamById = (core: Core, baseUrl: string) => {
  const evmFetcher = new OperationResolver(getStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, network, ...options }: GetStreamOptions) => {
    // Backwards compatibility for the 'network' parameter
    if (!networkType && network) {
      networkType = network;
    }

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
