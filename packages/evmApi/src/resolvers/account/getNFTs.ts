import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultAddress, resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address' | 'token_addresses'>>, PaginatedOptions {
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address?: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTsResolver = new EvmPaginatedResolver({
  name: 'getNFTs',
  getPath: (params: Params) => `${params.address}/nft`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        chain: resolveDefaultChain(params.chain),
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
      tokenHash: nft.token_hash,
      lastMetadataSync: new Date(nft.last_metadata_sync),
      lastTokenUriSync: new Date(nft.last_token_uri_sync),
    })),
  resultToJson: (data) =>
    data?.map((nft) => ({
      ...nft,
      syncedAt: nft.syncedAt?.toLocaleDateString(),
      token: nft.token.toJSON(),
      lastMetadataSync: nft.lastMetadataSync.toLocaleDateString(),
      lastTokenUriSync: nft.lastTokenUriSync.toLocaleDateString(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
    token_addresses: params.tokenAddresses?.map((address) => EvmAddress.create(address).lowercase),
    address: resolveDefaultAddress(params.address).lowercase,
  }),
});
