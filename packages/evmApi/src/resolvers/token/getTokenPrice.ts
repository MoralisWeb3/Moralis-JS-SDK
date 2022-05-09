import { toCamelCase } from './../../utils/toCamelCase';
import { EvmNative, EvmAddress } from '@moralis/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenPriceResolver = new EvmResolver({
  getPath: (params: ApiParams) => `erc20/${params.address}/price`,
  apiToResult: (data: ApiResult) => ({
    ...toCamelCase(data),
    nativePrice: EvmNative.create(data.nativePrice?.value!, data.nativePrice?.decimals!),
    exchangeAddress: EvmAddress.create(data.exchangeAddress!),
  }),
  resultToJson: (data) => ({
    ...data,
    exchangeAddress: data.exchangeAddress.format(),
    balance: data.nativePrice.format(),
  }),
  parseParams: (params) => params,
});
