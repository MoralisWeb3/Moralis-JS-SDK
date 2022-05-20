import { EvmAddress, EvmAddressish, EvmChain, EvmChainish, EvmNative } from '@moralis/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getNativeBalance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export const getNativeBalanceResolver = new EvmResolver({
  getPath: (params: ApiParams) => `${params.address}/balance`,
  apiToResult: (data: ApiResult) => ({
    balance: EvmNative.create(data.balance, 'wei'),
  }),
  resultToJson: (data) => ({
    balance: data.balance.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: EvmAddress.create(params.address).lowercase,
    to_block: params.toBlock,
    providerUrl: params.providerUrl,
  }),
});
