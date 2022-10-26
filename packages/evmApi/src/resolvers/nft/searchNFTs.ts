import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';

import { Camelize } from '@moralisweb3/common-core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNft } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'searchNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>>, PaginatedParams {
  chain?: EvmChainish;
  addresses?: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const searchNFTs = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'searchNFTs',
    getUrl: () => `/nft/search`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((nft) => ({
        token: EvmNft.create(
          {
            chain: EvmChainResolver.resolve(params.chain, core),
            contractType: nft.contract_type,
            tokenAddress: nft.token_address,
            tokenId: nft.token_id,
            tokenUri: nft.token_uri,
            metadata: nft.metadata,
            tokenHash: nft.token_hash as string,
          },
          core,
        ),
        tokenHash: nft.token_hash,
        blockNumberMinted: nft.block_number_minted,
        lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
        lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
        batchId: nft.batch_id,
        frozen: nft.frozen,
        frozenLogIndex: nft.frozen_log_index,
        imported: nft.imported,
        isValid: nft.is_valid,
        openseaLookup: nft.opensea_lookup,
        resyncing: nft.resyncing,
        syncing: nft.syncing,
        updatedAt: new Date(nft.updatedAt),
      })),
    resultToJson: (data) =>
      data.map((nft) => ({
        ...nft,
        token: nft.token.toJSON(),
        lastMetadataSync: nft.lastMetadataSync?.toLocaleDateString(),
        lastTokenUriSync: nft.lastTokenUriSync?.toLocaleDateString(),
        updatedAt: nft.updatedAt.toLocaleDateString(),
      })),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      addresses: params.addresses?.map((address) => EvmAddress.create(address, core).lowercase),
    }),
    firstPageIndex: 0,
  }),
);
