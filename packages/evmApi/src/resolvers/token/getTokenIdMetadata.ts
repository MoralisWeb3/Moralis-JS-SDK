import { EvmResolver } from './../Resolver';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
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

// TODO: discard this interface when swagger docs is updated
export interface GeneratedApiResult extends ApiResult {
  block_number_minted: string;
  block_number: string;
  owner_of: string;
  token_hash: string;
}

export const getTokenIdMetadataResolver = new EvmResolver({
  name: 'getTokenIdMetadata',
  getPath: (params: Params) => `nft/${params.address}/${params.tokenId}`,
  apiToResult: (data: GeneratedApiResult, params: Params) => ({
    token: new EvmNFT({
      chain: resolveDefaultChain(params.chain),
      contractType: data.contract_type,
      tokenAddress: data.token_address,
      tokenId: data.token_id,
      tokenUri: data.token_uri,
      metadata: data.metadata,
      name: data.name,
      symbol: data.symbol,
      tokenHash: data.token_hash,
    }),
    syncedAt: data.synced_at ? new Date(data.synced_at) : undefined,
    amount: data.amount,
    ownerOf: EvmAddress.create(data.owner_of),
    blockNumberMinted: data.block_number_minted,
    blockNumber: data.block_number,
    lastMetadataSync: data.last_metadata_sync ? new Date(data.last_metadata_sync) : undefined,
    lastTokenUriSync: data.last_token_uri_sync ? new Date(data.last_token_uri_sync) : undefined,
  }),
  resultToJson: (data) => ({
    ...data,
    syncedAt: data.syncedAt?.toLocaleDateString(),
    token: data.token.toJSON(),
    lastMetadataSync: data.lastMetadataSync?.toLocaleDateString(),
    lastTokenUriSync: data.lastTokenUriSync?.toLocaleDateString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    format: params.format,
  }),
});
