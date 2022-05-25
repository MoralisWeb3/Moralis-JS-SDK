import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChain, EvmChainish, EvmAddressish, EvmAddress, EvmTransactionLog } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getLogsByAddress';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getLogsByAddressResolver = new EvmPaginatedResolver({
  name: 'getLogsByAddress',
  getPath: (params: Params) => `${params.address}/logs`,
  apiToResult: (data: ApiResult) =>
    data.result?.map(
      (log) =>
        new EvmTransactionLog({
          ...toCamelCase(log),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
          blockNumber: Number(log.block_number),
        }),
    ),
  resultToJson: (data) => data?.map((log) => log.toJSON()),
  parseParams: (params: Params) => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
  }),
});
