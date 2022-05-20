import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChain, EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getNFTLowestPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTLowestPriceResolver = new EvmResolver({
  getPath: (params: Params) => `nft/${params.address}/lowestprice`,
  apiToResult: (data: ApiResult) => ({
    ...toCamelCase(data),
    sellerAddress: EvmAddress.create(data.seller_address),
    buyerAddress: EvmAddress.create(data.buyer_address),
    marketplaceAddress: EvmAddress.create(data.marketplace_address),
    tokenAddress: EvmAddress.create(data.token_address as string),
    price: EvmNative.create(data.price),
    blockTimestamp: new Date(data.block_timestamp),
  }),
  resultToJson: (data) => ({
    ...data,
    sellerAddress: data.sellerAddress.format(),
    buyerAddress: data.buyerAddress.format(),
    marketplaceAddress: data.marketplaceAddress.format(),
    blockTimestamp: data.blockTimestamp.toLocaleString(),
    price: data.price.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : 'eth',
    address: EvmAddress.create(params.address).lowercase,
    provider_url: params.providerUrl,
  }),
});
