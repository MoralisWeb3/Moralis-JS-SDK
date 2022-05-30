import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';

type operation = 'getNFTTrades';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTradesResolver = new EvmPaginatedResolver({
  name: 'getNFTTrades',
  getPath: (params: Params) => `nft/${params.address}/trades`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((trade) => ({
      ...toCamelCase(trade),
      sellerAddress: EvmAddress.create(trade.seller_address),
      buyerAddress: EvmAddress.create(trade.buyer_address),
      marketplaceAddress: EvmAddress.create(trade.marketplace_address),
      tokenAddress: EvmAddress.create(trade.token_address as string),
      price: EvmNative.create(trade.price),
      blockTimestamp: new Date(trade.block_timestamp),
    })),
  resultToJson: (data) =>
    data?.map((trade) => ({
      ...trade,
      sellerAddress: trade.sellerAddress.format(),
      buyerAddress: trade.buyerAddress.format(),
      marketplaceAddress: trade.marketplaceAddress.format(),
      blockTimestamp: trade.blockTimestamp.toLocaleString(),
      price: trade.price.format(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    to_block: params.toBlock,
    from_block: params.fromBlock,
    from_date: params.fromDate,
    to_date: params.toDate,
    provider_url: params.providerUrl,
  }),
});
