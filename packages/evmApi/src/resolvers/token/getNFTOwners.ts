import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNft } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTOwners';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTOwners = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTOwners',
    urlParams: ['address'],
    getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/owners`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? [])?.map((nft) =>
        EvmNft.create({
          ...toCamelCase(nft),
          chain: EvmChainResolver.resolve(params.chain, core),
          ownerOf: EvmAddress.create(nft.owner_of, core),
          lastMetadataSync: new Date(nft.last_metadata_sync),
          lastTokenUriSync: new Date(nft.last_token_uri_sync),
        }),
      ),
    resultToJson: (data) => data?.map((nft) => nft.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
