import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';

import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getWalletTokenIdTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getWalletTokenIdTransfers = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getWalletTokenIdTransfers',
    getUrl: (params: Params) => `${BASE_URL}/nft/${params.address}/${params.tokenId}/transfers`,
    apiToResult: (data: ApiResult) =>
      data.result?.map((transfer) => ({
        ...toCamelCase(transfer),
        tokenAddress: EvmAddress.create(transfer.to_address, core),
        toAddress: EvmAddress.create(transfer.to_address, core),
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
      token_id: params.tokenId,
    }),
  }),
);
