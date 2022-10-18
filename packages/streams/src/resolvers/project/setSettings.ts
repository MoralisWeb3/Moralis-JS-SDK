import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../../generated/types';

const name = 'SetSettings';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
type ApiResult = operations[Name]['responses']['200']['content']['application/json'];
export type SetSettingsParams = BodyParams;
const method = 'post';
const bodyParams = ['region'] as const;

export const setSettings = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/settings`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: SetSettingsParams): ApiParams => params,
    method,
    bodyParams,
  }),
);
