import { SolNetwork, SolAddress } from '@moralisweb3/sol-utils';
import { maybe, toCamelCase } from '@moralisweb3/core';
import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { operations } from '../generated/types';

const name = 'verifyChallengeSolana';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
type Params = ApiParams;
const method = 'post';
const bodyParams = ['message', 'signature'] as const;

type ApiResult = operations[Name]['responses']['201']['content']['application/json'];

export const completeChallengeSol = createEndpointFactory(() =>
  createEndpoint({
    name: 'Verify Challenge (Solana)',
    getUrl: () => `/challenge/verify/solana`,
    apiToResult: ({ network, ...data }: ApiResult) => ({
      ...data,
      solNetwork: SolNetwork.create(network),
      chain: undefined,
      address: SolAddress.create(data.address),
      expirationTime: maybe(data.expirationTime, (value) => new Date(value)),
    }),
    resultToJson: (result) => ({
      ...toCamelCase(result),
      solNetwork: result.solNetwork.format(),
      address: result.address.format(),
    }),
    parseParams: (params: Params): ApiParams => params,
    method,
    bodyParams,
  }),
);
