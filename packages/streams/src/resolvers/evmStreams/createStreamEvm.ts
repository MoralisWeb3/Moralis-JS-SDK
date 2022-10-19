import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { EvmStream } from '@moralisweb3/common-streams-utils'
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
  'chainIds',
  'abi',
  'advancedOptions',
] as const;

export interface CreateStreamEvmParams extends Camelize<Omit<ApiParams, 'chainIds'>> {
  chains: EvmChainish[];
}

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const createStreamEvm = createEndpointFactory((core) =>
  createEndpoint({
    name,
    getUrl: () => `/streams/evm`,
    apiToResult: (data: ApiResult) => EvmStream.create(data, core),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: CreateStreamEvmParams): ApiParams => ({
      ...params,
      chainIds: params.chains.map((chain) => EvmChain.create(chain).apiHex),
    }),
    method,
    bodyParams,
  }),
);
