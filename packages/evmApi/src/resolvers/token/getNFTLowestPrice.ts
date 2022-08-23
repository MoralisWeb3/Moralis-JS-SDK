import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';

import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative, EvmNftTrade } from '@moralisweb3/evm-utils';
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

export const getNFTLowestPrice = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getNFTLowestPrice',
    urlParams: ['address'],
    getUrl: (params: Params) => `/nft/${params.address}/lowestprice`,
    apiToResult: (data: ApiResult, params: Params) =>
      EvmNftTrade.create({
        ...toCamelCase(data),
        chain: EvmChainResolver.resolve(params.chain, core),
        sellerAddress: EvmAddress.create(data.seller_address, core),
        buyerAddress: EvmAddress.create(data.buyer_address, core),
        marketplaceAddress: EvmAddress.create(data.marketplace_address, core),
        tokenAddress: EvmAddress.create(data.token_address as string, core),
        price: EvmNative.create(data.price),
        blockTimestamp: new Date(data.block_timestamp),
        tokenIds: data.token_ids as string[],
      }),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      provider_url: params.providerUrl,
    }),
  }),
);
