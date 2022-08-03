import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { BASE_URL } from '../../EvmApi';
import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTransfers = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTTransfers',
    getUrl: (params: Params) => `${BASE_URL}/${params.address}/nft/transfers`,
    apiToResult: (data: ApiResult) =>
      data.result?.map((transfer) => ({
        ...toCamelCase(transfer),
        tokenAddress: EvmAddress.create(transfer.to_address),
        toAddress: EvmAddress.create(transfer.to_address),
        operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
        fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
        value: transfer.value ? EvmNative.create(transfer.value) : null,
        blockTimestamp: new Date(transfer.block_timestamp),
      })),
    resultToJson: (data) =>
      data?.map((transfer) => ({
        ...transfer,
        tokenAddress: transfer.tokenAddress.format(),
        toAddress: transfer.toAddress.format(),
        fromAddress: transfer.fromAddress?.format(),
        operator: transfer.operator?.format(),
        blockTimestamp: transfer.blockTimestamp.toLocaleString(),
        value: transfer.value?.format(),
      })),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);