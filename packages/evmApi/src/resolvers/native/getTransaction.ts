import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import { Camelize } from '@moralisweb3/core';
import { EvmChainish, EvmTransaction, EvmTransactionLog } from '@moralisweb3/evm-utils';
import { BASE_URL } from '../../EvmApi';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTransaction';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

export const getTransaction = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getTransaction',
    urlParams: ['transactionHash'],
    getUrl: (params: Params) => `${BASE_URL}/transaction/${params.transactionHash}`,
    apiToResult: (data: ApiResult, params: Params) => {
      return EvmTransaction.create({
        from: data.from_address,
        to: data.to_address,
        value: data.value,
        gasPrice: data.gas_price,
        gasUsed: data.receipt_gas_used,
        data: data.input,
        nonce: data.nonce,
        blockHash: data.block_hash,
        blockNumber: data.block_number,
        blockTimestamp: data.block_timestamp,
        index: data.transaction_index,
        chain: EvmChainResolver.resolve(params.chain, core),
        hash: data.hash,
        gas: data.gas,
        cumulativeGasUsed: data.receipt_cumulative_gas_used,
        contractAddress: data.receipt_contract_address,
        logs: data.logs.map((log) =>
          EvmTransactionLog.create({
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
          }),
        ),
        receiptRoot: data.receipt_root,
        receiptStatus: data.receipt_status,
      });
    },
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      subdomain: params.subdomain || undefined,
      transaction_hash: params.transactionHash,
    }),
  }),
);
