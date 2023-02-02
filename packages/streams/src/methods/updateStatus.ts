import { OperationResolver } from '@moralisweb3/api-utils';
import Core from '@moralisweb3/common-core';
import {
  updateStreamStatusAptosOperation,
  UpdateStreamStatusAptosRequest,
  updateStreamStatusEvmOperation,
  UpdateStreamStatusEvmRequest,
  UpdateStreamStatusAptosResponseAdapter,
  UpdateStreamStatusEvmResponseAdapter,
} from '@moralisweb3/common-streams-utils';
import { IncorrectNetworkError } from '../utils/IncorrectNetworkError';
import { StreamNetwork } from '../utils/StreamNetwork';
import { AptosStreamNetworkOptions, EvmStreamNetworkOptions } from '../utils/commonNetworkOptions';

export interface UpdateStreamAptosStatusOptions extends UpdateStreamStatusAptosRequest, AptosStreamNetworkOptions {}
export interface UpdateStreamEvmStatusOptions extends UpdateStreamStatusEvmRequest, EvmStreamNetworkOptions {}

export type UpdateStreamStatusOptions = UpdateStreamAptosStatusOptions | UpdateStreamEvmStatusOptions;
export type MakeUpdateAptosStreamStatus = (
  updateStreamOptions: UpdateStreamAptosStatusOptions,
) => Promise<UpdateStreamStatusAptosResponseAdapter>;
export type MakeUpdateEvmStreamStatus = (
  updateStreamOptions: UpdateStreamEvmStatusOptions,
) => Promise<UpdateStreamStatusEvmResponseAdapter>;

const makeUpdateAptosStreamStatus = (
  core: Core,
  baseUrl: string,
  { networkType, ...options }: UpdateStreamAptosStatusOptions,
) => {
  return new OperationResolver(updateStreamStatusAptosOperation, baseUrl, core).fetch(options);
};

const makeUpdateEvmStreamStatus = (
  core: Core,
  baseUrl: string,
  { networkType, ...options }: UpdateStreamEvmStatusOptions,
) => {
  return new OperationResolver(updateStreamStatusEvmOperation, baseUrl, core).fetch(options);
};

export const makeUpdateStreamStatus = (core: Core, baseUrl: string) => {
  return ((updateStreamOptions: UpdateStreamStatusOptions) => {
    switch (updateStreamOptions.networkType) {
      case StreamNetwork.APTOS:
        return makeUpdateAptosStreamStatus(core, baseUrl, updateStreamOptions);
      case StreamNetwork.EVM:
        return makeUpdateEvmStreamStatus(core, baseUrl, updateStreamOptions);
      default:
        if (updateStreamOptions.networkType === undefined) {
          return makeUpdateEvmStreamStatus(core, baseUrl, updateStreamOptions);
        }
        throw new IncorrectNetworkError(updateStreamOptions.networkType);
    }
  }) as MakeUpdateAptosStreamStatus & MakeUpdateEvmStreamStatus;
};
