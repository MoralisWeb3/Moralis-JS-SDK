import { ApiResolver, resolveDefaultChain } from '@moralisweb3/api';
import { EvmChainish, EvmTransactionReceipt, Camelize } from '@moralisweb3/core';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';

type operation = 'getTransaction';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTransactionResolver = new ApiResolver({
  name: 'getTransaction',
  getUrl: (params: Params) => `${BASE_URL}/transaction/${params.transactionHash}`,
  apiToResult: (data: ApiResult, params: Params) => {
    const transactionReciept = EvmTransactionReceipt.create(
      {
        // Transaction Receipt data
        cumulativeGasUsed: data.receipt_cumulative_gas_used,
        gasPrice: data.gas_price,
        gasUsed: data.receipt_gas_used,
        logs: data.logs.map((log) => ({
          address: log.address,
          blockHash: log.block_hash,
          blockNumber: +log.block_number,
          data: log.data,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
          transactionHash: log.transaction_hash,
          blockTimestamp: log.block_timestamp,
          logIndex: +log.log_index,
          transactionIndex: +log.transaction_index,
        })),
        transactionIndex: +data.transaction_index,
        contractAddress: data.receipt_contract_address,
        root: data.receipt_root,
        status: +data.receipt_status,
      },
      {
        // Transaction Response data
        chain: resolveDefaultChain(params.chain),
        data: data.input,
        from: data.from_address,
        hash: data.hash,
        nonce: data.nonce,
        value: data.value,
        blockHash: data.block_hash,
        blockNumber: +data.block_number,
        blockTimestamp: new Date(data.block_timestamp),
        gasPrice: data.gas_price,
        gasLimit: data.gas,
        to: data.to_address,
        // Not specified in Api response
        accessList: undefined,
        confirmations: undefined,
        maxFeePerGas: undefined,
        maxPriorityFeePerGas: undefined,
        type: undefined,
      },
    );

    return transactionReciept;
  },
  resultToJson: (data) => data.toJSON(),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    subdomain: params.subdomain || undefined,
    transaction_hash: params.transactionHash,
  }),
});
