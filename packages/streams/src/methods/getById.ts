import Core from '@moralisweb3/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { EvmStreamNetwork, StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  getStreamAptosOperation,
  GetStreamAptosRequest,
  getStreamEvmOperation,
  GetStreamEvmRequest,
  GetStreamAptosResponseAdapter,
  GetStreamEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

interface StreamNetworkOptions {
  /** @deprecated use networkType instead */
  network?: EvmStreamNetwork;
}

export interface GetStreamAptosOptions extends GetStreamAptosRequest, AptosStreamNetworkOptions, StreamNetworkOptions {}
export interface GetStreamEvmOptions extends GetStreamEvmRequest, EvmStreamNetworkOptions, StreamNetworkOptions {}

export type GetStreamOptions = GetStreamAptosOptions | GetStreamEvmOptions;
export type MakeGetAptosStream = (getStreamOptions: GetStreamAptosOptions) => Promise<GetStreamAptosResponseAdapter>;
export type MakeGetEvmStream = (getStreamOptions: GetStreamEvmOptions) => Promise<GetStreamEvmResponseAdapter>;

const makeGetAptosStream = (
  core: Core,
  baseUrl: string,
  { networkType, network, ...options }: GetStreamAptosOptions,
) => {
  return new OperationResolver(getStreamAptosOperation, baseUrl, core).fetch(options);
};

const makeGetEvmStream = (core: Core, baseUrl: string, { networkType, network, ...options }: GetStreamEvmOptions) => {
  return new OperationResolver(getStreamEvmOperation, baseUrl, core).fetch(options);
};

export const makeGetStreamById = (core: Core, baseUrl: string) => {
  return ((getStreamOptions: GetStreamOptions) => {
    // Backwards compatibility for the 'network' parameter
    if (!getStreamOptions.networkType && getStreamOptions.network) {
      getStreamOptions.networkType = getStreamOptions.network;
    }

    switch (getStreamOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeGetAptosStream(core, baseUrl, getStreamOptions);
      case StreamNetwork.EVM:
        return makeGetEvmStream(core, baseUrl, getStreamOptions);
      default:
        if (getStreamOptions.networkType === undefined) {
          return makeGetEvmStream(core, baseUrl, getStreamOptions);
        }
        throw new IncorrectNetworkError(getStreamOptions.networkType);
    }
  }) as MakeGetAptosStream & MakeGetEvmStream;
};
