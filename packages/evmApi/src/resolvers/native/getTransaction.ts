import { BigNumber } from 'ethers';
import { Camelize } from './../../utils/toCamelCase';
import {
  EvmTransaction,
  EvmTransactionLog,
  EvmAddress,
  EvmTransactionInput,
  EvmChainish,
  EvmChain,
} from '@moralis/core';
import { operations } from '../../generated/types';
import { getExtraData } from '../../utils/getExtraData';
import { toCamelCase } from '../../utils/toCamelCase';
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
  getPath: (params: Params) => `transaction/${params.transactionHash}`,
  apiToResult: (data: ApiResult) => {
    const transaction = toCamelCase(data);
    const transactionType = new EvmTransaction({
      ...transaction,
    });
    const extras = getExtraData<EvmTransactionInput, Camelize<ApiResult>>(transactionType.result, transaction);
    return {
      ...extras,
      transaction: transactionType,
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
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    subdomain: params.subdomain || undefined,
    transaction_hash: params.transactionHash,
  }),
});
