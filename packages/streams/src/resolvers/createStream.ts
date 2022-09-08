import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { operations } from '../generated/types';

const name = 'CreateStream';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'put';
const bodyParams = ['webhookUrl', 'description', 'tag', 'tokenAddress', 'topic0', 'filter', 'address', 'type'] as const;

export interface Params extends Camelize<Omit<ApiParams, 'tokenAddress' | 'address' | 'chainId'>> {
  tokenAddress?: EvmAddressish;
  address?: EvmAddressish;
  chainId: EvmChainish;
}

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    address: data.address ? EvmAddress.create(data.address) : undefined,
    tokenAddress: data.tokenAddress ? EvmAddress.create(data.tokenAddress) : undefined,
    chain: EvmChain.create(data.chainId),
  };
};

export const createStream = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/streams`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      address: data.address ? data.address.format() : undefined,
      tokenAddress: data.tokenAddress ? data.tokenAddress.format() : undefined,
      chainId: data.chain.format(),
    }),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      tokenAddress: params.tokenAddress ? EvmAddress.create(params.tokenAddress).checksum : undefined,
      address: params.address ? EvmAddress.create(params.address).checksum : undefined,
      chainId: EvmChain.create(params.chainId).apiHex,
    }),
    method,
    bodyParams,
  }),
);
