import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { operations } from '../generated/types';

const name = 'GetStreams';

type Name = typeof name;

type QueryParams = operations[Name]['parameters']['query'];
type ApiParams = QueryParams;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getStreams = createPaginatedEndpointFactory(() =>
  createPaginatedEndpoint({
    name,
    getUrl: () => `/streams`,
    apiToResult: (data: ApiResult) =>
      (data.result ?? []).map((stream) => ({
        ...stream,
        address: stream.address ? EvmAddress.create(stream.address) : undefined,
        tokenAddress: stream.tokenAddress ? EvmAddress.create(stream.tokenAddress) : undefined,
        chains: stream.chainIds.map((chainId) => EvmChain.create(chainId)),
      })),
    resultToJson: (data) =>
      data.map((stream) => ({
        ...stream,
        address: stream.address ? stream.address.format() : undefined,
        tokenAddress: stream.tokenAddress ? stream.tokenAddress.format() : undefined,
        chainIds: stream.chains.map((chain) => chain.format()),
      })),
    parseParams: (params: ApiParams) => params,
  }),
);
