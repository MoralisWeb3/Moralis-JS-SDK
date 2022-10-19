import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddress, EvmNative, EvmNftTransfer } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getNFTTransfersByBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>>, PaginatedParams {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTransfersByBlock = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getNFTTransfersByBlock',
    urlParams: ['blockNumberOrHash'],
    getUrl: (params: Params) => `/block/${params.blockNumberOrHash}/nft/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((transfer) =>
        EvmNftTransfer.create({
          ...toCamelCase(transfer),
          chain: EvmChainResolver.resolve(params.chain, core),
          tokenAddress: EvmAddress.create(transfer.to_address),
          toAddress: EvmAddress.create(transfer.to_address),
          operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
          fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
          value: transfer.value ? EvmNative.create(transfer.value) : null,
          blockTimestamp: new Date(transfer.block_timestamp),
        }),
      ),
    resultToJson: (data) => data.map((transaction) => transaction.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      block_number_or_hash: params.blockNumberOrHash,
    }),
    firstPageIndex: 0,
  }),
);
