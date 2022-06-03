import { EvmAddress, EvmAddressish, EvmChainish, Camelize } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { EvmResolver } from '../Resolver';

type operation = 'getPairReserves';

type PathParams = operations[operation]['parameters']['path'];
type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = PathParams & QueryParams;

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'pair_address'>> {
  chain?: EvmChainish;
  pairAddress: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getPairReservesResolver = new EvmResolver({
  name: 'getPairReserves',
  getPath: (params: Params) => `${params.pairAddress}/reserves`,
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
