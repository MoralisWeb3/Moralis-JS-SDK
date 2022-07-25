import { ApiResolver } from '@moralisweb3/api-utils';
import { EvmChainish, EvmAddressish, EvmAddress, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'reSyncMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const reSyncMetadataResolver = new ApiResolver({
  name: 'reSyncMetadata',
  getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/${params.tokenId}/metadata/resync`,
  apiToResult: (data: ApiResult) => ({
    ...data,
  }),
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    flag: params.flag,
    mode: params.mode,
  }),
});
