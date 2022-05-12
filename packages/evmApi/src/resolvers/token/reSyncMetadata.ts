import { EvmChainish, EvmAddressish, EvmAddress, EvmChain } from '@moralis/core';
import { operations } from '../../generated/types';
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
  getPath: (params: Params) => `nft/${EvmAddress.create(params.address).lowercase}/${params.tokenId}/metadata/resync`,
  apiToResult: (data: ApiResult) => ({
    ...data,
  }),
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: EvmAddress.create(params.address).lowercase,
    token_id: params.tokenId,
    flag: params.flag,
    mode: params.mode,
  }),
});
