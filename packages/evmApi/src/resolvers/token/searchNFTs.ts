import { resolveDefaultChain } from './../../utils/resolveDefaultParams';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
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
  apiToResult: (data: ApiResult) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        contractType: nft.contract_type,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
        metadata: nft.metadata,
        tokenHash: nft.token_hash as string,
      }),
      syncedAt: new Date(nft.synced_at),
      // TODO: below are data returned that are not present in swagger docs so no type definition (report to api squad)
      // tokenHash: nft.token_hash
      // blockNumberMinted: nft.
      // lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
      // lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
      // batchId
      // blockNumberMinted
      // frozen
      // frozenLogIndex
      // imported
      // isValid
      // openseaLookup
      // resyncing
      // syncing
      // updatedAt
    })),
  resultToJson: (data) =>
    data?.map((nft) => ({
      ...nft,
      syncedAt: nft.syncedAt.toLocaleDateString(),
      token: nft.token.toJSON(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain),
    addresses: params.addresses?.map((address) => EvmAddress.create(address).lowercase),
  }),
});
