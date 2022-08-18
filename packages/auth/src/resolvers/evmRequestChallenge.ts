import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { operations } from '../generated/types';
import { BASE_URL } from '../MoralisAuth';

const name = 'requestChallengeEvm';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'post';
const bodyParams = [
  'domain',
  'chainId',
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

const apiToResult = (apiData: ApiResult, params: Params) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
  };
};

export const initializeChallenge = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: Params) => `${BASE_URL}/challenge/request/evm`,
    apiToResult: apiToResult,
    resultToJson: (data) => ({
      ...data,
    }),
    parseParams: (params: Params): ApiParams => params,
    method,
    bodyParams,
  }),
);
