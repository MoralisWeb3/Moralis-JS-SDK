import { maybe, toCamelCase } from '@moralisweb3/core';
import { EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../generated/types';
import { BASE_URL } from '../MoralisAuth';

const name = 'verifyChallengeEvm';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
type Params = ApiParams;
const method = 'post';
const bodyParams = ['message', 'signature'] as const;

type ApiResult = operations[Name]['responses']['201']['content']['application/json'];

export const completeChallenge = createEndpointFactory(() =>
  createEndpoint({
    name: 'Verify Challenge (EVM)',
    getUrl: () => `${BASE_URL}/challenge/verify/evm`,
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
    parseParams: (params: Params): ApiParams => params,
    method,
    bodyParams,
  }),
);
