import { OperationResolver } from '@moralisweb3/api-utils';
import { StreamNetwork } from '../utils/StreamNetwork';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import {
  updateStreamAptosOperation,
  UpdateStreamAptosRequest,
  updateStreamEvmOperation,
  UpdateStreamEvmRequest,
  UpdateStreamAptosResponseAdapter,
  UpdateStreamEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import Core from '@moralisweb3/common-core';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamAptosOptions extends UpdateStreamAptosRequest, AptosStreamNetworkOptions {}
export interface UpdateStreamEvmOptions extends UpdateStreamEvmRequest, EvmStreamNetworkOptions {}

export type UpdateStreamOptions = UpdateStreamAptosOptions | UpdateStreamEvmOptions;
export type MakeUpdateAptosStream = (
  updateStreamOptions: UpdateStreamAptosOptions,
) => Promise<UpdateStreamAptosResponseAdapter>;
export type MakeUpdateEvmStream = (
  updateStreamOptions: UpdateStreamEvmOptions,
) => Promise<UpdateStreamEvmResponseAdapter>;

const makeUpdateAptosStream = (core: Core, baseUrl: string, { networkType, ...options }: UpdateStreamAptosOptions) => {
  return new OperationResolver(updateStreamAptosOperation, baseUrl, core).fetch(options);
};

const makeUpdateEvmStream = (core: Core, baseUrl: string, { networkType, ...options }: UpdateStreamEvmOptions) => {
  return new OperationResolver(updateStreamEvmOperation, baseUrl, core).fetch(options);
};

export const makeUpdateStream = (core: Core, baseUrl: string) => {
  return ((updateStreamOptions: UpdateStreamOptions) => {
    switch (updateStreamOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeUpdateAptosStream(core, baseUrl, updateStreamOptions);
      case StreamNetwork.EVM:
        return makeUpdateEvmStream(core, baseUrl, updateStreamOptions);
      default:
        if (updateStreamOptions.networkType === undefined) {
          return makeUpdateEvmStream(core, baseUrl, updateStreamOptions);
        }
        throw new IncorrectNetworkError(updateStreamOptions.networkType);
    }
  }) as MakeUpdateAptosStream & MakeUpdateEvmStream;
};
