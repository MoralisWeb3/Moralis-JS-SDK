import { ApiPaginatedResolver, ApiPaginatedOptions } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getAllTokenIds';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type GeneratedApiResult = operations[operation]['responses']['200']['content']['application/json'];
// TODO: discard this interface when swagger docs is updated
interface ApiResult extends Omit<GeneratedApiResult, 'result'> {
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

export const getAllTokenIdsResolver = new ApiPaginatedResolver({
  name: 'getAllTokenIds',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.result?.map((nft) => ({
      token: new EvmNFT({
        chain: EvmChainResolver.resolve(params.chain),
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
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
  }),
});
