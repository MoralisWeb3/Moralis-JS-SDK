import { createEndpoint, createEndpointFactory } from '@moralisweb3/api-utils';
import MoralisCore, { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmTransaction, EvmTransactionLog, EvmBlock } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getBlock';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain'>> {
  chain?: EvmChainish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

const apiToResult = (core: MoralisCore, apiData: ApiResult, params: Params) => {
  const data = toCamelCase(apiData);
  const chain = EvmChainResolver.resolve(params.chain, core);

  return EvmBlock.create(
    {
      ...data,
      chain,
      transactions: (data.transactions ?? []).map((transaction) =>
        EvmTransaction.create(
          {
            cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
            gasPrice: transaction.gasPrice,
            gasUsed: transaction.receiptGasUsed,
            index: transaction.transactionIndex,
            contractAddress: transaction.receiptContractAddress,
            receiptRoot: transaction.receiptRoot,
            receiptStatus: +transaction.receiptStatus,
            chain,
            data: transaction.input,
            from: transaction.fromAddress,
            hash: transaction.hash,
            nonce: transaction.nonce,
            value: transaction.value,
            blockHash: transaction.blockHash,
            blockNumber: +transaction.blockNumber,
            blockTimestamp: new Date(transaction.blockTimestamp),
            gas: transaction.gas,
            to: transaction.toAddress,
            logs: (transaction.logs ?? []).map((log) =>
              EvmTransactionLog.create({
                chain,
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
              }),
            ),
          },
          core,
        ),
      ),
    },
    core,
  );
};

export const getBlock = createEndpointFactory((core) =>
  createEndpoint({
    name: 'getBlock',
    urlParams: ['blockNumberOrHash'],
    getUrl: (params: Params) => `/block/${params.blockNumberOrHash}`,
    apiToResult: (result: ApiResult, params: Params) => {
      return apiToResult(core, result, params);
    },
    resultToJson: (data) => data.toJSON(),
    parseParams: (params: Params): ApiParams => ({
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      block_number_or_hash: params.blockNumberOrHash,
      subdomain: params.subdomain,
    }),
  }),
);
