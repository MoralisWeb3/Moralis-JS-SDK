import { EvmNative } from '@moralis/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getNativeBalance';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNativeBalanceResolver = new EvmResolver({
  getPath: (params: ApiParams) => `${params.address}/balance`,
  apiToResult: (data: ApiResult) => ({
    balance: EvmNative.create(data.balance, 'wei'),
  }),
  resultToJson: (data) => ({
    balance: data.balance.format(),
  }),
  parseParams: (params) => params,
});
