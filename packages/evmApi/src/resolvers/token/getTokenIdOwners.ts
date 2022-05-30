import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getTokenIdOwners';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenIdOwnersResolver = new EvmPaginatedResolver({
  name: 'getTokenIdOwners',
  getPath: (params: Params) => `nft/${params.address}/${params.tokenId}/owners`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        contractType: nft.contract_type,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
        metadata: nft.metadata,
        name: nft.name,
        symbol: nft.symbol,
      }),
      syncedAt: nft.synced_at ? new Date(nft.synced_at) : undefined,
      blockNumberMinted: nft.block_number_minted,
      blockNumber: nft.block_number,
      ownerOf: EvmAddress.create(nft.owner_of),
      amount: nft.amount,
      // TODO: below are data returned that are not present in swagger docs so no type definition (report to api squad)
      // tokenHash: nft.token_hash
      //   lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
      //   lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
    })),
  resultToJson: (data) =>
    data?.map((nft) => ({
      ...nft,
      syncedAt: nft.syncedAt?.toLocaleDateString(),
      token: nft.token.toJSON(),
    })),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    cursor: params.cursor,
    format: params.format,
    limit: params.limit,
  }),
});
