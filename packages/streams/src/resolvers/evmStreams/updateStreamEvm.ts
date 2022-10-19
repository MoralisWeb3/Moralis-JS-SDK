import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { EvmStream } from '@moralisweb3/common-streams-utils'
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
const urlParams = ['id'] as const;

export interface UpdateStreamEvmParams extends Camelize<Omit<ApiParams, 'chainIds'>> {
  chains: EvmChainish[];
}

type ApiResult = operations[Name]['responses']['200']['content']['application/json'];

export const updateStreamEvm = createEndpointFactory((core) =>
  createEndpoint({
    name,
    getUrl: ({ id }: UpdateStreamEvmParams) => `/streams/evm/${id}`,
    urlParams,
    apiToResult: (data: ApiResult) => EvmStream.create(data, core),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: UpdateStreamEvmParams): ApiParams => ({
      ...params,
      chainIds: params.chains.map((chain) => EvmChain.create(chain).apiHex),
    }),
    method,
    bodyParams,
  }),
);
