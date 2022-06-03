import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getAllTokenIds';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];
// TODO: discard this interface when swagger docs is updated
interface GeneratedApiResult extends Omit<ApiResult, 'result'> {
  result: [
    {
      amount: string;
      block_number_minted: string;
      contract_type: string;
      last_metadata_sync: string;
      last_token_uri_sync: string;
      metadata: string;
      name: string;
      symbol: string;
      synced_at: string;
      token_address: string;
      token_hash: string;
      token_id: string;
      token_uri: string;
    },
  ];
}

export const getAllTokenIdsResolver = new EvmPaginatedResolver({
  name: 'getAllTokenIds',
  getPath: (params: Params) => `nft/${params.address}`,
  apiToResult: (data: GeneratedApiResult, params: Params) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        chain: resolveDefaultChain(params.chain),
        contractType: nft.contract_type,
        tokenAddress: nft.token_address,
        tokenId: nft.token_id,
        tokenUri: nft.token_uri,
        metadata: nft.metadata,
        name: nft.name,
        tokenHash: nft.token_hash,
        symbol: nft.symbol,
      }),
      syncedAt: nft.synced_at ? new Date(nft.synced_at) : undefined,
      amount: nft.amount,
      blockNumberMinted: nft.block_number_minted,
      lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
      lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
    })),
  resultToJson: (data) =>
    data?.map((nft) => ({
      ...nft,
      token: nft.token.toJSON(),
      lastMetadataSync: nft.lastMetadataSync?.toLocaleDateString(),
      lastTokenUriSync: nft.lastTokenUriSync?.toLocaleDateString(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
  }),
});
