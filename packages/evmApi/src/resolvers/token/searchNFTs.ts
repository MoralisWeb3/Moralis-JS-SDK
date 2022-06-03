import { resolveDefaultChain } from './../../utils/resolveDefaultParams';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'searchNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'addresses'>>, PaginatedOptions {
  chain?: EvmChainish;
  addresses?: EvmAddressish[];
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const searchNFTsResolver = new EvmPaginatedResolver({
  name: 'searchNFTs',
  getPath: () => `nft/search`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        chain: resolveDefaultChain(params.chain),
        contractType: nft.contract_type,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
        metadata: nft.metadata,
        tokenHash: nft.token_hash as string,
      }),
      syncedAt: new Date(nft.synced_at),
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
    data?.map((nft) => ({
      ...nft,
      syncedAt: nft.syncedAt.toLocaleDateString(),
      token: nft.token.toJSON(),
      lastMetadataSync: nft.lastMetadataSync?.toLocaleDateString(),
      lastTokenUriSync: nft.lastTokenUriSync?.toLocaleDateString(),
      updatedAt: nft.updatedAt.toLocaleDateString(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
    addresses: params.addresses?.map((address) => EvmAddress.create(address).lowercase),
  }),
});
