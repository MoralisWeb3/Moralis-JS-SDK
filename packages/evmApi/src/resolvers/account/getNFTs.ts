import { createPaginatedEndpoint, createPaginatedEndpointFactory, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address' | 'token_addresses'>>, PaginatedParams {
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTs = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTs',
    getUrl: (params: Params) => `${BASE_URL}/${params.address}/nft`,
    apiToResult: (data: ApiResult, params: Params) =>
      data.result?.map((nft) => ({
        token: new EvmNFT({
          chain: EvmChainResolver.resolve(params.chain, core),
          contractType: nft.contract_type,
          tokenAddress: nft.token_address,
          tokenId: nft.token_id,
          tokenUri: nft.token_uri,
          metadata: nft.metadata,
          name: nft.name,
          symbol: nft.symbol,
        }),
        blockNumberMinted: nft.block_number_minted,
        blockNumber: nft.block_number,
        ownerOf: EvmAddress.create(nft.owner_of, core),
        tokenHash: nft.token_hash,
        lastMetadataSync: new Date(nft.last_metadata_sync),
        lastTokenUriSync: new Date(nft.last_token_uri_sync),
      })),
    resultToJson: (data) =>
      data?.map((nft) => ({
        ...nft,
        token: nft.token.toJSON(),
        lastMetadataSync: nft.lastMetadataSync.toLocaleDateString(),
        lastTokenUriSync: nft.lastTokenUriSync.toLocaleDateString(),
      })),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      token_addresses: params.tokenAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
