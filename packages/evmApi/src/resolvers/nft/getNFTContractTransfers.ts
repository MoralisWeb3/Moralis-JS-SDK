import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmNative, EvmNftTransfer } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getContractNFTTransfers
type operation = 'getNFTContractTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTContractTransfers = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTContractTransfers',
    group: 'nft',
    urlParams: ['address'],
    getUrl: (params: Params) => `/nft/${params.address}/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((transfer) =>
        EvmNftTransfer.create({
          ...toCamelCase(transfer),
          chain: EvmChainResolver.resolve(params.chain, core),
          tokenAddress: EvmAddress.create(transfer.to_address),
          toAddress: EvmAddress.create(transfer.to_address),
          operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
          fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
          value: transfer.value ? EvmNative.create(transfer.value) : null,
          blockTimestamp: new Date(transfer.block_timestamp),
        }),
      ),
    resultToJson: (data) => data.map((transfer) => transfer.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
    firstPageIndex: 0,
  }),
);
