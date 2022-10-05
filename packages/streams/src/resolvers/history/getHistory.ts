import { createPaginatedEndpoint, createPaginatedEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

const name = 'GetHistory';

type Name = typeof name;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
type QueryParams = operations[Name]['parameters']['query'];
type ApiParams = QueryParams;
export type GetHistoryParams = ApiParams;

export const getHistory = createPaginatedEndpointFactory(() =>
  createPaginatedEndpoint({
    name,
    getUrl: () => `/history`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: GetHistoryParams): ApiParams => params,
  }),
);
