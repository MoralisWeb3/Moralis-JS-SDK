import { resolveDefaultAddress, resolveDefaultChain, ApiResolver } from '@moralisweb3/api-utils';
import { EvmAddressish, EvmChainish, EvmNative, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getNativeBalance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

export const getNativeBalanceResolver = new ApiResolver({
  name: 'getNativeBalance',
  getUrl: (params: Params) => `${BASE_URL}/${params.address}/balance`,
  apiToResult: (data: ApiResult) => ({
    balance: EvmNative.create(data.balance, 'wei'),
  }),
  resultToJson: (data) => ({
    balance: data.balance.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    address: resolveDefaultAddress(params.address).lowercase,
    to_block: params.toBlock,
    providerUrl: params.providerUrl,
  }),
});
