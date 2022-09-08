import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { EvmAddress } from '@moralisweb3/evm-utils';
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
      (data.data ?? []).map((stream) => ({
        ...stream,
        address: stream.address ? EvmAddress.create(stream.address) : undefined,
        tokenAddress: stream.tokenAddress ? EvmAddress.create(stream.tokenAddress) : undefined,
      })),
    resultToJson: (data) =>
      data.map((stream) => ({
        ...stream,
        address: stream.address ? stream.address.format() : undefined,
        tokenAddress: stream.tokenAddress ? stream.tokenAddress.format() : undefined,
      })),
    parseParams: (params: ApiParams) => params,
  }),
);
