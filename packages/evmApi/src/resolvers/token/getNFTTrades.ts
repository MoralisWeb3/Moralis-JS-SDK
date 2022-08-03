import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTTrades';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTrades = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTTrades',
    getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/trades`,
    apiToResult: (data: ApiResult) =>
      data.result?.map((trade) => ({
        ...toCamelCase(trade),
        sellerAddress: EvmAddress.create(trade.seller_address, core),
        buyerAddress: EvmAddress.create(trade.buyer_address, core),
        marketplaceAddress: EvmAddress.create(trade.marketplace_address, core),
        tokenAddress: EvmAddress.create(trade.token_address as string, core),
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
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      to_block: params.toBlock,
      from_block: params.fromBlock,
      from_date: params.fromDate,
      to_date: params.toDate,
      provider_url: params.providerUrl,
    }),
  }),
);