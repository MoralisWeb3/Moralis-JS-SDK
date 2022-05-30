import { EvmResolver } from './../Resolver';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';

type operation = 'getTokenIdMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenIdMetadataResolver = new EvmResolver({
  name: 'getTokenIdMetadata',
  getPath: (params: Params) => `nft/${params.address}/${params.tokenId}`,
  apiToResult: (data: ApiResult) => ({
    token: new EvmNFT({
      contractType: data.contract_type,
      tokenAddress: data.token_address,
      tokenId: data.token_id,
      tokenUri: data.token_uri,
      metadata: data.metadata,
      name: data.name,
      symbol: data.symbol,
    }),
    syncedAt: data.synced_at ? new Date(data.synced_at) : undefined,
    amount: data.amount,
    // TODO: below are data returned that are not present in swagger docs so no type definition (report to api squad)
    // ownerOf: EvmAddress.create(data.owner_of),
    //   blockNumberMinted: data.block_number_minted,
    //   blockNumber: data.block_number,
    // tokenHash: nft.token_hash
    //   lastMetadataSync: nft.last_metadata_sync ? new Date(nft.last_metadata_sync) : undefined,
    //   lastTokenUriSync: nft.last_token_uri_sync ? new Date(nft.last_token_uri_sync) : undefined,
  }),
  resultToJson: (data) => ({
    ...data,
    syncedAt: data.syncedAt?.toLocaleDateString(),
    token: data.token.toJSON(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    format: params.format,
  }),
});
