import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';

const name = 'CreateStream';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type ApiParams = BodyParams;
const method = 'put';
const bodyParams = [
  'webhookUrl',
  'description',
  'tag',
  'topic0',
  'allAddresses',
  'includeNativeTxs',
  'includeContractLogs',
  'includeInternalTxs',
  'filter',
  'chainIds',
  'abi',
] as const;

export interface CreateStreamEvmParams extends Camelize<Omit<ApiParams, 'chainIds'>> {
  chains: EvmChainish[];
}

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    chains: data.chainIds.map((chainId) => EvmChain.create(chainId)),
  };
};

export const createStreamEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      chainIds: data.chains.map((chain) => chain.format()),
    }),
    parseParams: (params: CreateStreamEvmParams): ApiParams => ({
      ...params,
      chainIds: params.chains.map((chain) => EvmChain.create(chain).apiHex),
    }),
    method,
    bodyParams,
  }),
);
