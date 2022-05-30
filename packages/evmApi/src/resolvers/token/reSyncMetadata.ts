import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'reSyncMetadata';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const reSyncMetadataResolver = new EvmResolver({
  name: 'reSyncMetadata',
  getPath: (params: Params) => `nft/${params.address}/${params.tokenId}/metadata/resync`,
  apiToResult: (data: ApiResult) => ({
    ...data,
  }),
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    flag: params.flag,
    mode: params.mode,
  }),
});
