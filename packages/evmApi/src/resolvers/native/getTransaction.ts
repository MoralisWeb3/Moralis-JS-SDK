import { resolveDefaultChain } from './../../utils/resolveDefaultParams';
import { Camelize } from './../../utils/toCamelCase';
import { EvmChainish, EvmChain, EvmTransactionReceipt } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { EvmResolver } from '../Resolver';

type operation = 'getTransaction';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTransactionResolver = new EvmResolver({
  name: 'getTransaction',
  getPath: (params: Params) => `transaction/${params.transactionHash}`,
  apiToResult: (data: ApiResult) => {
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
        // TODO: properly pass chain
        chain: EvmChain.create(1),
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
    chain: resolveDefaultChain(params.chain),
    subdomain: params.subdomain || undefined,
    transaction_hash: params.transactionHash,
  }),
});
