import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNft } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getAllTokenIds';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getAllTokenIds = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getAllTokenIds',
    urlParams: ['address'],
    getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map(
        (nft) =>
          new EvmNft({
            ...toCamelCase(nft),
            chain: EvmChainResolver.resolve(params.chain, core),
            ownerOf: nft.owner_of ? EvmAddress.create(nft.owner_of, core) : undefined,
            lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
            lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
          }),
      ),
    resultToJson: (data) => data.map((nft) => nft.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
