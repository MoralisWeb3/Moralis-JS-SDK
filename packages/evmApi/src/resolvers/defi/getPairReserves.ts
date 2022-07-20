import { ApiResolver, resolveDefaultChain } from '@moralisweb3/api';
import { EvmAddress, EvmAddressish, EvmChainish, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getPairReserves';

type PathParams = operations[operation]['parameters']['path'];
type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = PathParams & QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'pair_address'>> {
  chain?: EvmChainish;
  pairAddress: EvmAddressish;
}

// TODO: use swagger results when the types have been fixed
// type GeneratedApiResult = operations[operation]['responses']['200']['content']['application/json'];
type ApiResult = {
  reserve0: string;
  reserve1: string;
};

export const getPairReservesResolver = new ApiResolver({
  name: 'getPairReserves',
  getUrl: (params: Params) => `${BASE_URL}/${params.pairAddress}/reserves`,
  apiToResult: (data: ApiResult) => data,
  resultToJson: (data) => data,
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    pair_address: EvmAddress.create(params.pairAddress).lowercase,
    provider_url: params.providerUrl,
    to_block: params.toBlock,
    to_date: params.toDate,
  }),
});
