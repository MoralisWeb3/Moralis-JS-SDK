import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';

import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/evm-utils';
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

export const reSyncMetadata = createEndpointFactory((core) =>
  createEndpoint({
    name: 'reSyncMetadata',
    group: 'nft',
    urlParams: ['address', 'tokenId'],
    getUrl: (params: Params) => `/nft/${params.address}/${params.tokenId}/metadata/resync`,
    apiToResult: (data: ApiResult) => ({
      ...data,
    }),
    resultToJson: (data) => data,
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      token_id: params.tokenId,
      flag: params.flag,
      mode: params.mode,
    }),
  }),
);
