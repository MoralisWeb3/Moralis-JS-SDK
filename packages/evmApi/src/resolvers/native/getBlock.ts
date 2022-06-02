import { EvmAddress, EvmChainish, EvmTransactionReceipt } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { resolveDefaultChain } from '../../utils/resolveDefaultParams';
import { Camelize, toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult, params: Params) => {
  const data = toCamelCase(apiData);

  return {
    ...data,
    miner: new EvmAddress(data.miner),
    transactions: data.transactions.map((transaction) =>
      EvmTransactionReceipt.create(
        {
          // Transaction Receipt data
          cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
          gasPrice: transaction.gasPrice,
          gasUsed: transaction.receiptGasUsed,
          logs: transaction.logs.map((log) => ({
            address: log.address,
            blockHash: log.blockHash,
            blockNumber: +log.blockNumber,
            data: log.data,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
            transactionHash: log.transactionHash,
            blockTimestamp: log.blockTimestamp,
            logIndex: +log.logIndex,
            transactionIndex: +log.transactionIndex,
          })),
          transactionIndex: +transaction.transactionIndex,
          contractAddress: transaction.receiptContractAddress,
          root: transaction.receiptRoot,
          status: +transaction.receiptStatus,
        },
        {
          // Transaction Response data
          chain: resolveDefaultChain(params.chain),
          data: transaction.input,
          from: transaction.fromAddress,
          hash: transaction.hash,
          nonce: transaction.nonce,
          value: transaction.value,
          blockHash: transaction.blockHash,
          blockNumber: +transaction.blockNumber,
          blockTimestamp: new Date(transaction.blockTimestamp),
          gasPrice: transaction.gasPrice,
          gasLimit: transaction.gas,
          to: transaction.toAddress,
          // Not specified in Api response
          accessList: undefined,
          confirmations: undefined,
          maxFeePerGas: undefined,
          maxPriorityFeePerGas: undefined,
          type: undefined,
        },
      ),
    ),
  };
};

export const getBlockResolver = new EvmResolver({
  name: 'getBlock',
  getPath: (params: Params) => `block/${params.blockNumberOrHash}`,
  apiToResult: apiToResult,
  resultToJson: (data) => ({
    ...data,
    transactions: data.transactions.map((transaction) => transaction.toJSON()),
    miner: data.miner.format(),
  }),
  parseParams: (params: Params): ApiParams => ({
    chain: resolveDefaultChain(params.chain).apiHex,
    block_number_or_hash: params.blockNumberOrHash,
    subdomain: params.subdomain,
  }),
});
