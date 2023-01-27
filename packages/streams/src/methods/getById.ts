import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  getStreamAptosOperation,
  GetStreamAptosRequest,
  getStreamEvmOperation,
  GetStreamEvmRequest,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

interface StreamNetworkOptions {
  /** @deprecared use networkType instead */
  network?: StreamNetwork;
}

export interface GetStreamAptosOptions extends GetStreamAptosRequest, AptosStreamNetworkOptions, StreamNetworkOptions {}
export interface GetStreamEvmOptions extends GetStreamEvmRequest, EvmStreamNetworkOptions, StreamNetworkOptions {}

export type GetStreamOptions = GetStreamAptosOptions | GetStreamEvmOptions;

export const makeGetStreamById = (core: Core, baseUrl: string) => {
  const aptosFetcher = new OperationResolver(getStreamAptosOperation, baseUrl, core).fetch;
  const evmFetcher = new OperationResolver(getStreamEvmOperation, baseUrl, core).fetch;

  return ({ networkType, network, ...options }: GetStreamOptions) => {
    // Backwards compatibility for the 'network' parameter
    if (!networkType && network) {
      networkType = network;
    }

    switch (networkType) {
      case StreamNetwork.APTOS:
        return aptosFetcher({ ...options });
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
