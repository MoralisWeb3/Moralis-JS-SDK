import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../generated/types';

const name = 'GetSettings';

type Name = typeof name;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const readSettings = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/settings`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params) => params,
  }),
);
