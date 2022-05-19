import { PaginatedOptions } from './../PaginatedResolver';
import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChain, EvmChainish, EvmAddress, EvmNative } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver } from '../PaginatedResolver';

type operation = 'getNftTransfersFromToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>>, PaginatedOptions {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNftTransfersFromToBlockResolver = new EvmPaginatedResolver({
  getPath: (params: Params) => `nft/transfers`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((transfer) => ({
      ...toCamelCase(transfer),
      tokenAddress: EvmAddress.create(transfer.to_address),
      toAddress: EvmAddress.create(transfer.to_address),
      operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
      value: transfer.value ? EvmNative.create(transfer.value) : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    })),
  resultToJson: (data) =>
    data?.map((transfer) => ({
      ...transfer,
      tokenAddress: transfer.tokenAddress.format(),
      toAddress: transfer.toAddress.format(),
      fromAddress: transfer.fromAddress?.format(),
      operator: transfer.operator?.format(),
      blockTimestamp: transfer.blockTimestamp.toLocaleString(),
      value: transfer.value?.format(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : 'eth',
    to_block: params.toBlock,
    from_block: params.fromBlock,
    from_date: params.fromDate,
    to_date: params.toDate,
  }),
});
