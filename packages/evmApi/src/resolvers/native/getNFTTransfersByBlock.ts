import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmAddress, EvmNative, EvmNFT } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
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
    getUrl: (params: Params) => `${BASE_URL}/block/${params.blockNumberOrHash}/nft/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      data.result?.map((transfer) => ({
        token: new EvmNFT({
          chain: EvmChainResolver.resolve(params.chain, core),
          contractType: transfer.contract_type,
          tokenAddress: transfer.token_address,
          tokenId: transfer.token_id,
        }),
        blockNumber: transfer.block_number,
        blockHash: transfer.block_hash,
        transactionHash: transfer.transaction_hash,
        transactionType: transfer.transaction_type,
        transactionIndex: transfer.transaction_index,
        toAddress: EvmAddress.create(transfer.to_address, core),
        operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
        fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
        value: transfer.value ? EvmNative.create(transfer.value) : null,
        blockTimestamp: new Date(transfer.block_timestamp),
      })),
    resultToJson: (data) =>
      data?.map((transfer) => ({
        ...transfer,
        token: transfer.token.toJSON(),
        toAddress: transfer.toAddress.format(),
        fromAddress: transfer.fromAddress?.format(),
        operator: transfer.operator?.format(),
        blockTimestamp: transfer.blockTimestamp.toLocaleString(),
        value: transfer.value?.format(),
      })),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      block_number_or_hash: params.blockNumberOrHash,
    }),
  }),
);
