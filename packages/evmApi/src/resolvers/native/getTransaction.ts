import { BigNumber } from 'ethers';
import { Camelize } from './../../utils/toCamelCase';
import { EvmTransaction, EvmTransactionLog, EvmAddress, EvmTransactionInput } from '@moralis/core';
import { operations } from '../../generated/types';
import { getExtraData } from '../../utils/getExtraData';
import { toCamelCase } from '../../utils/toCamelCase';
import { EvmResolver } from '../Resolver';

type operation = 'getTransaction';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTransactionResolver = new EvmResolver({
  getPath: (params: ApiParams) => `transaction/${params.transaction_hash}`,
  apiToResult: (data: ApiResult) => {
    const transaction = toCamelCase(data);
    const extras = getExtraData<EvmTransactionInput, Camelize<ApiResult>>(transaction);
    return {
      ...extras,
      transaction: new EvmTransaction({
        ...transaction,
      }),
      logs: data.logs.map(
        (log) =>
          new EvmTransactionLog({
            ...toCamelCase(log),
            topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
            logIndex: Number(log.log_index),
            transactionIndex: Number(log.transaction_index),
            blockNumber: Number(log.block_number),
          }),
      ),
      fromAddress: EvmAddress.create(extras.fromAddress!),
      toAddress: EvmAddress.create(extras.toAddress!),
      receiptCumulativeGasUsed: BigNumber.from(extras.receiptCumulativeGasUsed!),
      receiptGasUsed: BigNumber.from(extras.receiptGasUsed!),
    };
  },
  resultToJson: (data) => ({
    ...data,
    logs: data.logs.map((log) => log.toJSON()),
    fromAddress: data.fromAddress.format(),
    toAddress: data.toAddress.format(),
    receiptCumulativeGasUsed: data.receiptCumulativeGasUsed.toNumber(),
    receiptGasUsed: data.receiptGasUsed.toNumber(),
  }),
  parseParams: (params) => params,
});
