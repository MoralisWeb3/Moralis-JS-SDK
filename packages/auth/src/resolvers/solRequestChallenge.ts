import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/common-core';
import { operations } from '../generated/types';

const name = 'requestChallengeSolana';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'post';
const bodyParams = [
  'domain',
  'network',
  'address',
  'statement',
  'uri',
  'expirationTime',
  'notBefore',
  'resources',
  'timeout',
] as const;
type Params = ApiParams;

type ApiResult = operations[Name]['responses']['201']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
  };
};

export const initializeChallengeSol = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/challenge/request/solana`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
    }),
    parseParams: (params: Params): ApiParams => params,
    method,
    bodyParams,
  }),
);
