import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNft } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getTokenIdMetadata
type operation = 'getNFTMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getNFTMetadata',
    urlParams: ['address', 'tokenId'],
    getUrl: (params: Params) => `/nft/${params.address}/${params.tokenId}`,
    apiToResult: (data: ApiResult, params: Params) =>
      EvmNft.create(
        {
          ...toCamelCase(data),
          chain: EvmChainResolver.resolve(params.chain, core),
          ownerOf: data.owner_of ? EvmAddress.create(data.owner_of, core) : undefined,
          lastMetadataSync: data.last_metadata_sync ? new Date(data.last_metadata_sync) : undefined,
          lastTokenUriSync: data.last_token_uri_sync ? new Date(data.last_token_uri_sync) : undefined,
        },
        core,
      ),
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      token_id: params.tokenId,
      format: params.format,
    }),
  }),
);
