import { EvmAddress, EvmChain, maybe, toCamelCase } from '@moralisweb3/core';
import { ApiResolver } from '@moralisweb3/api';
import { operations } from '../generated/types';
import { BASE_URL } from '../MoralisAuth';

type name = 'completeChallenge';
type BodyParams = operations[name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
type Params = ApiParams;
const method = 'post';
const bodyParams = ['message', 'signature'] as const;

type ApiResult = operations[name]['responses']['201']['content']['application/json'];

export const completeChallengeResolver = new ApiResolver({
  name: 'completeChallenge',
  getUrl: (params: Params) => `${BASE_URL}/challenge/complete`,
  apiToResult: ({ chainId, ...data }: ApiResult) => ({
    ...data,
    // TODO: revisit EVM logic once we know how authentication in other networks work
    chain: EvmChain.create(chainId),
    address: EvmAddress.create(data.address),
    expirationTime: maybe(data.expirationTime, (value) => new Date(value)),
  }),
  resultToJson: (result) => ({
    ...toCamelCase(result),
    chain: result.chain.format(),
    address: result.address.format(),
  }),
  parseParams: (params: ApiParams): ApiParams => params,
  method,
  bodyParams,
});
