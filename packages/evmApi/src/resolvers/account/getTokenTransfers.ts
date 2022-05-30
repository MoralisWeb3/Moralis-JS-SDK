import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';
import { BigNumber } from 'ethers';
import { resolveDefaultAddress, resolveDefaultChain } from '../../utils/resolveDefaultParams';

type operation = 'getTokenTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenTransfersResolver = new EvmPaginatedResolver({
  name: 'getTokenTransfers',
  getPath: (params: Params) => `${params.address}/erc20/transfers`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((transfer) => ({
      ...toCamelCase(transfer),
      address: EvmAddress.create(transfer.address),
      toAddress: EvmAddress.create(transfer.to_address),
      fromAddress: EvmAddress.create(transfer.from_address),
      value: BigNumber.from(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    })),
  resultToJson: (data) =>
    data?.map((transfer) => ({
      ...transfer,
      address: transfer.address.format(),
      toAddress: transfer.toAddress.format(),
      fromAddress: transfer.fromAddress.format(),
      value: transfer.value.toString(),
      blockTimestamp: transfer.blockTimestamp.toLocaleString(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
    address: resolveDefaultAddress(params.address).lowercase,
    to_block: params.toBlock,
    from_block: params.fromBlock,
    from_date: params.fromDate,
    to_date: params.toDate,
  }),
});
