import { createPaginatedEndpoint, createPaginatedEndpointFactory, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, dateInputToDate } from '@moralisweb3/common-core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNft } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getNFTs
type operation = 'getWalletNFTs';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address' | 'token_addresses'>>, PaginatedParams {
  chain?: EvmChainish;
  tokenAddresses?: EvmAddressish[];
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getWalletNFTs = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getWalletNFTs',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/nft`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((nft) =>
        EvmNft.create({
          chain: EvmChainResolver.resolve(params.chain, core),
          contractType: nft.contract_type,
          tokenAddress: nft.token_address,
          tokenId: nft.token_id,
          tokenUri: nft.token_uri,
          metadata: nft.metadata,
          name: nft.name,
          symbol: nft.symbol,
          amount: nft.amount ? parseInt(nft.amount, 10) : undefined,
          blockNumberMinted: nft.block_number_minted,
          blockNumber: nft.block_number,
          ownerOf: EvmAddress.create(nft.owner_of, core),
          tokenHash: nft.token_hash,
          lastMetadataSync: dateInputToDate(nft.last_metadata_sync),
          lastTokenUriSync: dateInputToDate(nft.last_token_uri_sync),
        }),
      ),
    resultToJson: (data) => data.map((nft) => nft.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      token_addresses: params.tokenAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
