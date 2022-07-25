import { ApiResolver } from '@moralisweb3/api-utils';
import { toCamelCase } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChain, EvmChainish } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getNFTMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const getNFTMetadataResolver = new ApiResolver({
  name: 'getNFTMetadata',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/metadata`,
  apiToResult: (data: ApiResult) => ({
    ...toCamelCase(data),
    tokenAddress: EvmAddress.create(data.token_address),
    syncedAt: data.synced_at ? new Date(data.synced_at) : undefined,
  }),
  resultToJson: (data) => ({
    ...data,
    tokenAddress: data.tokenAddress.format(),
    syncedAt: data.syncedAt?.toDateString(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: EvmAddress.create(params.address).lowercase,
  }),
});
