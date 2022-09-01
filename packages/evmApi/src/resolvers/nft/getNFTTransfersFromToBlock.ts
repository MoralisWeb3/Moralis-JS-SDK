import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddress, EvmNative, EvmNftTransfer } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNftTransfersFromToBlock';

type QueryParams = operations[operation]['parameters']['query'];
type ApiParams = QueryParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>>, PaginatedParams {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTransfersFromToBlock = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTTransfersFromToBlock',
    getUrl: () => `/nft/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((transfer) =>
        EvmNftTransfer.create({
          ...toCamelCase(transfer),
          chain: EvmChainResolver.resolve(params.chain, core),
          tokenAddress: EvmAddress.create(transfer.to_address, core),
          toAddress: EvmAddress.create(transfer.to_address, core),
          operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
          fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
          value: transfer.value ? EvmNative.create(transfer.value) : null,
          blockTimestamp: new Date(transfer.block_timestamp),
        }),
      ),
    resultToJson: (data) => data.map((transfer) => transfer.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      to_block: params.toBlock,
      from_block: params.fromBlock,
      from_date: params.fromDate,
      to_date: params.toDate,
    }),
  }),
);
