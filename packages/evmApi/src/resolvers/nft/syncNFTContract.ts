import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

const method = 'put';

type operation = 'syncNFTContract';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['201'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const syncNFTContract = createEndpointFactory((core) =>
  createEndpoint({
    name: 'syncNFTContract',
    urlParams: ['address'],
    getUrl: (params: Params) => `/nft/${params.address}/sync`,
    apiToResult: (_: ApiResult) => ({
      success: true,
    }),
    resultToJson: () => ({
      success: true,
    }),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
    method,
  }),
);
