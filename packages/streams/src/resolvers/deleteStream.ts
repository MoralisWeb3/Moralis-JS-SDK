import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { operations } from '../generated/types';

const name = 'DeleteStream';

type Name = typeof name;
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
const method = 'delete';

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    address: data.address ? EvmAddress.create(data.address) : undefined,
    tokenAddress: data.tokenAddress ? EvmAddress.create(data.tokenAddress) : undefined,
    chains: data.chainIds.map((chainId) => EvmChain.create(chainId)),
  };
};

export const deleteStream = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: ApiParams) => `/streams/${params.id}`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      address: data.address ? data.address.format() : undefined,
      tokenAddress: data.tokenAddress ? data.tokenAddress.format() : undefined,
      chainIds: data.chains.map((chain) => chain.format()),
    }),
    parseParams: (params: ApiParams): ApiParams => params,
    method,
  }),
);
