import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import {
  createStreamAptosOperation,
  CreateStreamAptosRequest,
  createStreamEvmOperation,
  CreateStreamEvmRequest,
  CreateStreamAptosResponseAdapter,
  CreateStreamEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';

export interface CreateStreamAptosOptions extends CreateStreamAptosRequest, AptosStreamNetworkOptions {}
export interface CreateStreamEvmOptions extends CreateStreamEvmRequest, EvmStreamNetworkOptions {}

export type CreateStreamOptions = CreateStreamAptosOptions | CreateStreamEvmOptions;
export type MakeCreateAptosStream = (
  createStreamOptions: CreateStreamAptosOptions,
) => Promise<CreateStreamAptosResponseAdapter>;
export type MakeCreateEvmStream = (
  createStreamOptions: CreateStreamEvmOptions,
) => Promise<CreateStreamEvmResponseAdapter>;

const makeCreateAptosStream = (core: Core, baseUrl: string, { networkType, ...options }: CreateStreamAptosOptions) => {
  return new OperationResolver(createStreamAptosOperation, baseUrl, core).fetch(options);
};

const makeCreateEvmStream = (core: Core, baseUrl: string, { networkType, ...options }: CreateStreamEvmOptions) => {
  return new OperationResolver(createStreamEvmOperation, baseUrl, core).fetch(options);
};

export const makeCreateStream = (core: Core, baseUrl: string) => {
  return ((createStreamOptions: CreateStreamOptions) => {
    switch (createStreamOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeCreateAptosStream(core, baseUrl, createStreamOptions);
      case StreamNetwork.EVM:
        return makeCreateEvmStream(core, baseUrl, createStreamOptions);
      default:
        if (createStreamOptions.networkType === undefined) {
          return makeCreateEvmStream(core, baseUrl, createStreamOptions);
        }
        throw new IncorrectNetworkError(createStreamOptions.networkType);
    }
  }) as MakeCreateAptosStream & MakeCreateEvmStream;
};
