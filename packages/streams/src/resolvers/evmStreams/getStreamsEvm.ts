import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { EvmStream } from '@moralisweb3/common-streams-utils';
import { operations } from '../../generated/types';

const name = 'GetStreams';

type Name = typeof name;

type QueryParams = operations[Name]['parameters']['query'];
type ApiParams = QueryParams;
export type GetStreamsEvmParams = ApiParams;

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const getStreamsEvm = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult: (data: ApiResult) => (data.result ?? []).map((stream) => EvmStream.create(stream, core)),
    resultToJson: (data) => data.map((stream) => stream.toJSON()),
    parseParams: (params: GetStreamsEvmParams): ApiParams => params,
  }),
);
