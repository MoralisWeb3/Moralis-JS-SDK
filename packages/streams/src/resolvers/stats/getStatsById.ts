import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../operations/openapi';

const name = 'GetStatsByStreamId';

type Name = typeof name;
const urlParams = ['streamId'] as const;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
export type GetStatsByStreamIdParams = ApiParams;

export const getStatsById = createEndpointFactory(() =>
  createEndpoint({
    name,
    urlParams,
    getUrl: ({ streamId }: GetStatsByStreamIdParams) => `/stats/${streamId}`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params) => params,
  }),
);
