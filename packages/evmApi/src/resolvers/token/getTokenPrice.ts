import { toCamelCase, Camelize } from './../../utils/toCamelCase';
import { EvmNative, EvmAddress, EvmChainish, EvmAddressish, EvmChain } from '@moralis/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

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
    nativePrice: data.nativePrice.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: EvmAddress.create(params.address).lowercase,
    exchange: params.exchange,
    to_block: params.toBlock,
    providerUrl: params.providerUrl,
  }),
});
