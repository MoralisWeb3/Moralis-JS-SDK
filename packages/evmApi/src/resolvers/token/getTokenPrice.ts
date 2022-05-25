import { toCamelCase, Camelize } from './../../utils/toCamelCase';
import { EvmNative, EvmAddress, EvmChainish, EvmAddressish, EvmChain } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTokenPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

export const getTokenPriceResolver = new EvmResolver({
  name: 'getTokenPrice',
  getPath: (params: ApiParams) => `erc20/${params.address}/price`,
  apiToResult: (data: ApiResult) => ({
    ...toCamelCase(data),
    nativePrice: data.nativePrice?.value ? EvmNative.create(data.nativePrice?.value, data.nativePrice?.decimals) : null,
    exchangeAddress: data.exchangeAddress ? EvmAddress.create(data.exchangeAddress) : null,
  }),
  resultToJson: (data) => ({
    ...data,
    exchangeAddress: data.exchangeAddress ? data.exchangeAddress.format() : null,
    nativePrice: data.nativePrice ? data.nativePrice.format() : null,
  }),
  parseParams: (params: Params) => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
    exchange: params.exchange,
    to_block: params.toBlock,
    providerUrl: params.providerUrl,
  }),
});
