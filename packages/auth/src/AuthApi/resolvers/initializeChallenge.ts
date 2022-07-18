import { toCamelCase } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { AuthApiResolver } from './AuthApiResolver';

type name = 'initializeChallenge';
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

type ApiResult = operations[name]['responses']['201']['content']['application/json'];

const apiToResult = (apiData: ApiResult, params: ApiParams) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
  };
};

export const initializeChallenge = new AuthApiResolver({
  name: 'initializeChallenge',
  getPath: () => `challenge/`,
  apiToResult: apiToResult,
  resultToJson: (data) => ({
    ...data,
  }),
  parseParams: (params: ApiParams): ApiParams => params,
  method,
  bodyParams,
});
