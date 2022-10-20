import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChain, EvmChainish } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

const name = 'UpdateStream';

type Name = typeof name;
type BodyParams = operations[Name]['requestBody']['content']['application/json'];
type PathParams = operations[Name]['parameters']['path'];
type ApiParams = BodyParams & PathParams;
const method = 'post';
const bodyParams = [
  'webhookUrl',
  'description',
  'tag',
  'topic0',
  'allAddresses',
  'includeNativeTxs',
  'includeContractLogs',
  'includeInternalTxs',
  'abi',
  'chainIds',
  'advancedOptions',
] as const;

export interface UpdateStreamEvmParams extends Camelize<Omit<ApiParams, 'chainIds'>> {
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

export const updateStreamEvm = createEndpointFactory(() =>
  createEndpoint({
    name,
    getUrl: (params: UpdateStreamEvmParams) => `/streams/evm/${params.id}`,
    apiToResult,
    resultToJson: (data) => ({
      ...data,
      chainIds: data.chains.map((chain) => chain.format()),
    }),
    parseParams: (params: UpdateStreamEvmParams): ApiParams => ({
      ...params,
      chainIds: params.chains.map((chain) => EvmChain.create(chain).apiHex),
    }),
    method,
    bodyParams,
  }),
);
