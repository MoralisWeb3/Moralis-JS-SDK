import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

const name = 'GetStreams';

type Name = typeof name;

type QueryParams = operations[Name]['parameters']['query'];
type ApiParams = QueryParams;
export type GetStreamsEvmParams = ApiParams;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getStreamsEvm = createPaginatedEndpointFactory(() =>
  createPaginatedEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult: (data: ApiResult) =>
      (data.result ?? []).map((stream) => ({
        ...stream,
        chains: stream.chainIds.map((chainId) => EvmChain.create(chainId)),
      })),
    resultToJson: (data) =>
      data.map((stream) => ({
        ...stream,
        chainIds: stream.chains.map((chain) => chain.format()),
      })),
    parseParams: (params: GetStreamsEvmParams): ApiParams => params,
  }),
);
