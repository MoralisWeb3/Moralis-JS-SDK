import { BigNumber } from 'ethers';
import { EvmChain, EvmChainish, EvmAddressish, EvmAddress, EvmTransactionReceipt } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { Camelize } from '../../utils/toCamelCase';
import { EvmPaginatedResolver, PaginatedOptions } from '../PaginatedResolver';

type operation = 'getTransactions';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address' | 'cursor'>>, PaginatedOptions {
  chain?: EvmChainish;
  address?: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTransactionsResolver = new EvmPaginatedResolver({
  name: 'getTransactions',
  getPath: (params: Params) => `${params.address}`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((transaction) =>
      EvmTransactionReceipt.create(
        {
          // Transaction Receipt data
          cumulativeGasUsed: transaction.receipt_cumulative_gas_used,
          gasPrice: transaction.gas_price,
          gasUsed: transaction.receipt_gas_used,
          transactionIndex: +transaction.transaction_index,
          contractAddress: transaction.receipt_contract_address,
          root: transaction.receipt_root,
          status: +transaction.receipt_status,
        },
        {
          // Transaction Response data
          // TODO: properly pass chain
          chain: EvmChain.create(1),
          data: transaction.input,
          from: transaction.from_address,
          hash: transaction.hash,
          nonce: transaction.nonce,
          value: transaction.value,
          blockHash: transaction.block_hash,
          blockNumber: +transaction.block_number,
          blockTimestamp: new Date(transaction.block_timestamp),
          gasPrice: transaction.gas_price,
          gasLimit: BigNumber.from(transaction.gas),
          to: transaction.to_address,
          // Not specified in Api response
          accessList: undefined,
          confirmations: undefined,
          maxFeePerGas: undefined,
          maxPriorityFeePerGas: undefined,
          type: undefined,
        },
      ),
    ),
  resultToJson: (data) => data?.map((transaction) => transaction.toJSON()),
  parseParams: (params: Params) => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    address: params.address ? EvmAddress.create(params.address).lowercase : undefined,
    to_block: params.toBlock,
    from_block: params.fromBlock,
    from_date: params.fromDate,
    to_date: params.toDate,
  }),
});
