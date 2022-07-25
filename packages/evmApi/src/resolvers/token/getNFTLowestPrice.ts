import { ApiResolver } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative, toCamelCase, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTLowestPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTLowestPriceResolver = new ApiResolver({
  name: 'getNFTLowestPrice',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/lowestprice`,
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
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    provider_url: params.providerUrl,
  }),
});
