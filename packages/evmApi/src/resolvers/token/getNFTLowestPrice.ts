import { toCamelCase } from './../../utils/toCamelCase';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';

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
  name: 'getNFTLowestPrice',
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
    chain: resolveDefaultChain(params.chain),
    address: EvmAddress.create(params.address).lowercase,
    provider_url: params.providerUrl,
  }),
});
