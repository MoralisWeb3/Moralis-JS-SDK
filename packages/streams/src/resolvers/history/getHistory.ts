import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

const name = 'GetHistory';

type Name = typeof name;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
type QueryParams = operations[Name]['parameters']['query'];
type ApiParams = QueryParams;
type Params = ApiParams;

export const getHistory = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/history`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: Params): ApiParams => params,
  }),
);
