import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../generated/types';

const name = 'ReplayHistory';

type Name = typeof name;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
type Params = ApiParams;

export const replayHistory = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (id: Params) => `/history/replay/${id}`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: Params): ApiParams => params,
  }),
);
