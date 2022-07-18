import { toCamelCase } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { AuthApiResolver } from './AuthApiResolver';

type name = 'completeChallenge';
type BodyParams = operations[name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'post';
const bodyParams = ['message', 'signature'] as const;

type ApiResult = operations[name]['responses']['201']['content']['application/json'];

const apiToResult = (apiData: ApiResult, params: ApiParams) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
  };
};

export const completeChallenge = new AuthApiResolver({
  name: 'completeChallenge',
  getPath: () => `challenge/complete`,
  apiToResult: apiToResult,
  resultToJson: (data) => ({
    ...data,
  }),
  parseParams: (params: ApiParams): ApiParams => params,
  method,
  bodyParams,
});
