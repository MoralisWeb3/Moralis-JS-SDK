import { ApiResolver } from '@moralisweb3/api';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNFT, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTokenIdMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type GeneratedApiResult = operations[operation]['responses']['200']['content']['application/json'];

// TODO: discard this interface when swagger docs is updated
export interface ApiResult extends GeneratedApiResult {
  block_number_minted: string;
  block_number: string;
  owner_of: string;
  token_hash: string;
}

export const getTokenIdMetadataResolver = new ApiResolver({
  name: 'getTokenIdMetadata',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/${params.tokenId}`,
  apiToResult: (data: ApiResult, params: Params) => ({
    token: new EvmNFT({
      chain: EvmChainResolver.resolve(params.chain),
      contractType: data.contract_type,
      tokenAddress: data.token_address,
      tokenId: data.token_id,
      tokenUri: data.token_uri,
      metadata: data.metadata,
      name: data.name,
      symbol: data.symbol,
      tokenHash: data.token_hash,
    }),
    amount: data.amount,
    ownerOf: EvmAddress.create(data.owner_of),
    blockNumberMinted: data.block_number_minted,
    blockNumber: data.block_number,
    lastMetadataSync: data.last_metadata_sync ? new Date(data.last_metadata_sync) : undefined,
    lastTokenUriSync: data.last_token_uri_sync ? new Date(data.last_token_uri_sync) : undefined,
  }),
  resultToJson: (data) => ({
    ...data,
    token: data.token.toJSON(),
    lastMetadataSync: data.lastMetadataSync?.toLocaleDateString(),
    lastTokenUriSync: data.lastTokenUriSync?.toLocaleDateString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    format: params.format,
  }),
});
