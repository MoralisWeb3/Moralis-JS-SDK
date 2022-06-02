import { resolveDefaultChain } from './../../utils/resolveDefaultParams';
import { EvmChainish, EvmAddress, EvmNative, EvmNFT } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getNFTTransfersByBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>>, PaginatedOptions {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getNFTTransfersByBlockResolver = new EvmPaginatedResolver({
  name: 'getNFTTransfersByBlock',
  getPath: (params: Params) => `block/${params.blockNumberOrHash}/nft/transfers`,
  apiToResult: (data: ApiResult, params: Params) =>
    data.result?.map((transfer) => ({
      token: new EvmNFT({
        chain: resolveDefaultChain(params.chain),
        contractType: transfer.contract_type,
        tokenAddress: transfer.token_address,
        tokenId: transfer.token_id,
      }),
      blockNumber: transfer.block_number,
      blockHash: transfer.block_hash,
      transactionHash: transfer.transaction_hash,
      transactionType: transfer.transaction_type,
      transactionIndex: transfer.transaction_index,
      toAddress: EvmAddress.create(transfer.to_address),
      operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
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
    chain: resolveDefaultChain(params.chain).apiHex,
    block_number_or_hash: params.blockNumberOrHash,
  }),
});
