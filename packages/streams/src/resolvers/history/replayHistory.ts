import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

const name = 'ReplayHistory';

type Name = typeof name;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = PathParams;
const urlParams = ['id', 'streamId'] as const;
export type ReplayHistoryParams = ApiParams;
const method = 'post';

export const replayHistory = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: ({ streamId, id }: ReplayHistoryParams) => `/history/replay/${streamId}/${id}`,
    urlParams,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: ReplayHistoryParams): ApiParams => params,
    method,
  }),
);
