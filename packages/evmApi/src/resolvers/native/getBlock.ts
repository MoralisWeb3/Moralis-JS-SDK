import { EvmAddress, EvmChain, EvmChainish, EvmTransactionReceipt } from '@moralisweb3/core';
import { operations } from '../../generated/types';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Omit<ApiParams, 'chain'> {
  chain?: EvmChainish;
  // TODO: add camelCased block_number_or_hash
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

const apiToResult = (apiData: ApiResult) => {
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
          // TODO: properly pass chain
          chain: EvmChain.create(1),
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

// TODO: use Transaction DataTypes
export const getBlockResolver = new EvmResolver({
  getPath: (params: Params) => `block/${params.block_number_or_hash}`,
  apiToResult: (apiData: ApiResult) => apiToResult(apiData),
  resultToJson: (data) => ({
    ...data,
    transactions: data.transactions.map((transaction) => transaction.toJSON()),
    miner: data.miner.format(),
  }),
  parseParams: (params) => ({
    ...params,
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
  }),
});
