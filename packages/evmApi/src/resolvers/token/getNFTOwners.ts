import { ApiPaginatedOptions, ApiPaginatedResolver } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTOwners';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTOwnersResolver = new ApiPaginatedResolver({
  name: 'getNFTOwners',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/owners`,
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
        symbol: nft.symbol,
        tokenHash: nft.token_hash,
      }),
      blockNumberMinted: nft.block_number_minted,
      blockNumber: nft.block_number,
      ownerOf: EvmAddress.create(nft.owner_of),
      amount: nft.amount,
      lastMetadataSync: new Date(nft.last_metadata_sync),
      lastTokenUriSync: new Date(nft.last_token_uri_sync),
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
