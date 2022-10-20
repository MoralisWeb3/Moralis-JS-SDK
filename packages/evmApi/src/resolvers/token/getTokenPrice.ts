import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmNative, EvmAddress, EvmChainish, EvmAddressish } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTokenPrice';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address' | 'to_block'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  toBlock?: number;
}

export const getTokenPrice = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getTokenPrice',
    urlParams: ['address'],
    getUrl: (params: Params) => `/erc20/${params.address}/price`,
    apiToResult: (data: ApiResult, _: Params) => ({
      ...toCamelCase(data),
      nativePrice: data.nativePrice?.value
        ? EvmNative.create(data.nativePrice?.value, data.nativePrice?.decimals)
        : null,
      exchangeAddress: data.exchangeAddress ? EvmAddress.create(data.exchangeAddress, core) : null,
    }),
    resultToJson: (data) => ({
      ...data,
      exchangeAddress: data.exchangeAddress ? data.exchangeAddress.format() : null,
      nativePrice: data.nativePrice ? data.nativePrice.format() : null,
    }),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      exchange: params.exchange,
      to_block: params.toBlock,
      providerUrl: params.providerUrl,
    }),
  }),
);
