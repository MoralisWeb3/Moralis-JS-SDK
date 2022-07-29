import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { operations } from '../generated/types';
import { BASE_URL } from '../MoralisAuth';

type name = 'Request Challenge (EVM)';
type BodyParams = operations[name]['requestBody']['content']['application/json'];
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

type ApiResult = operations[name]['responses']['201']['content']['application/json'];

const apiToResult = (apiData: ApiResult, params: Params) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
  };
};

export const initializeChallenge = createEndpointFactory(() =>
  createEndpoint({
    name: 'Request Challenge (EVM)',
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
