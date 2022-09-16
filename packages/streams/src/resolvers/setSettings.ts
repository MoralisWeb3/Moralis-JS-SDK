import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../generated/types';

const name = 'SetSettings';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'post';
const bodyParams = ['region'] as const;

export const setSettings = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/settings`,
    apiToResult: () => ({
      success: true,
    }),
    resultToJson: (data) => data,
    parseParams: (params: ApiParams): ApiParams => params,
    method,
    bodyParams,
  }),
);
