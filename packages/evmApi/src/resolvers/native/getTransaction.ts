import { Camelize } from './../../utils/toCamelCase';
import {
  EvmChainish,
  EvmChain,
  EvmTransactionReceipt,
  EvmTransactionResponse,
  EvmTransactionLogInput,
} from '@moralis/core';
import { operations } from '../../generated/types';
// import { getExtraData } from '../../utils/getExtraData';
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
    const transactionType = new EvmTransactionResponse({
      ...transaction,
      from: transaction.fromAddress,
      to: transaction.toAddress,
      // TODO: properly pass chain
      chain: EvmChain.create(1),
      data: transaction.hash,
      blockNumber: Number(transaction.blockNumber),
      blockTimestamp: Date.parse(transaction.blockTimestamp),
    });
    const transactionReciept = new EvmTransactionReceipt(
      {
        ...transaction,
        from: transaction.fromAddress,
        to: transaction.toAddress,
        gasUsed: transaction.receiptGasUsed,
        contractAddress: transaction.receiptContractAddress,
        cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
        transactionIndex: Number(transaction.transactionIndex),
        blockNumber: Number(transaction.blockNumber),
        logs: transaction.logs.map(
          (log): EvmTransactionLogInput => ({
            ...log,
            topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
            logIndex: Number(log.logIndex),
            transactionIndex: Number(log.transactionIndex),
            blockNumber: Number(log.blockNumber),
          }),
        ),
      },
      transactionType,
    );
    // const extras = getExtraData<EvmTransactionInput, Camelize<ApiResult>>(transactionReciept.result, transaction);
    return transactionReciept;
  },
  resultToJson: (data) => data.toJSON(),
  parseParams: (params: Params): ApiParams => ({
    chain: params.chain ? EvmChain.create(params.chain).apiHex : undefined,
    subdomain: params.subdomain || undefined,
    transaction_hash: params.transactionHash,
  }),
});
