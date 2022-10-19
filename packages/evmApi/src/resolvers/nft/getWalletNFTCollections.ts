import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNftCollection } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getWalletNFTCollections';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getWalletNFTCollections = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getWalletNFTCollections',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/nft/collections`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((collection) =>
        EvmNftCollection.create(
          {
            ...toCamelCase(collection),
            chain: EvmChainResolver.resolve(params.chain, core),
            tokenAddress: EvmAddress.create(collection.token_address, core),
          },
          core,
        ),
      ),
    resultToJson: (data) => data.map((transaction) => transaction.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
