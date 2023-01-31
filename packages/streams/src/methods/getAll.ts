import Core from '@moralisweb3/common-core';
import { PaginatedOperationResolver } from '@moralisweb3/api-utils';
import {
  getStreamsAptosOperation,
  getStreamsEvmOperation,
  GetStreamsAptosRequest,
  GetStreamsEvmRequest,
  GetStreamsAptosResponseAdapter,
  GetStreamsEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface GetStreamsAptosOptions extends GetStreamsAptosRequest, AptosStreamNetworkOptions {}
export interface GetStreamsEvmOptions extends GetStreamsEvmRequest, EvmStreamNetworkOptions {}

export type GetStreamsOptions = GetStreamsAptosOptions | GetStreamsEvmOptions;
export type MakeGetAptosStream = (getStreamOptions: GetStreamsAptosOptions) => Promise<GetStreamsAptosResponseAdapter>;
export type MakeGetEvmStream = (getStreamOptions: GetStreamsEvmOptions) => Promise<GetStreamsEvmResponseAdapter>;

const makeGetAptosStream = (core: Core, baseUrl: string, { networkType, ...options }: GetStreamsAptosOptions) => {
  return new PaginatedOperationResolver(getStreamsAptosOperation, baseUrl, core).fetch(options);
};

const makeGetEvmStream = (core: Core, baseUrl: string, { networkType, ...options }: GetStreamsEvmOptions) => {
  return new PaginatedOperationResolver(getStreamsEvmOperation, baseUrl, core).fetch(options);
};

export const makeGetStreams = (core: Core, baseUrl: string) => {
  return ((getStreamsOptions: GetStreamsOptions) => {
    switch (getStreamsOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeGetAptosStream(core, baseUrl, getStreamsOptions);
      case StreamNetwork.EVM:
        return makeGetEvmStream(core, baseUrl, getStreamsOptions);
      default:
        if (getStreamsOptions.networkType === undefined) {
          return makeGetEvmStream(core, baseUrl, getStreamsOptions);
        }
        throw new IncorrectNetworkError(getStreamsOptions.networkType);
    }
  }) as MakeGetAptosStream & MakeGetEvmStream;
};
