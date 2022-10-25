import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmAddress, EvmAddressish, EvmChainish } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getPairReserves';

type PathParams = operations[operation]['parameters']['path'];
type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = PathParams & QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'pair_address'>> {
  chain?: EvmChainish;
  pairAddress: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getPairReserves = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getPairReserves',
    urlParams: ['pairAddress'],
    getUrl: (params: Params) => `/${params.pairAddress}/reserves`,
    apiToResult: (data: ApiResult) => data,
    resultToJson: (data) => data,
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      pair_address: EvmAddress.create(params.pairAddress, core).lowercase,
      provider_url: params.providerUrl,
      to_block: params.toBlock,
      to_date: params.toDate,
    }),
  }),
);
