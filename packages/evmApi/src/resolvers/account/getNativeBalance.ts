import { EvmAddressish, EvmChainish, EvmNative } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain, resolveDefaultAddress } from '../../utils/resolveDefaultParams';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getNativeBalance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

export const getNativeBalanceResolver = new EvmResolver({
  name: 'getNativeBalance',
  getPath: (params: Params) => `${params.address}/balance`,
  apiToResult: (data: ApiResult) => ({
    balance: EvmNative.create(data.balance, 'wei'),
  }),
  resultToJson: (data) => ({
    balance: data.balance.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain),
    address: resolveDefaultAddress(params.address),
    to_block: params.toBlock,
    providerUrl: params.providerUrl,
  }),
});
