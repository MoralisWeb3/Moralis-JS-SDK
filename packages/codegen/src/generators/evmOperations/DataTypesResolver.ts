import { EvmNative, EvmNativeish, EvmNftTransfer, EvmChainResolver, EvmAddress } from '@moralisweb3/common-evm-utils';
import { toCamelCase } from '@moralisweb3/common-core';

import { components } from './openapi';

export class DataTypesResolver {
  private paginatedResponse = (schema: string) => {
    return `return (jsonResponse.result || []).map((transfer) => {${schema}}`;
  };
  public nativeBalance = (jsonResponse: components['schemas']['nativeBalance']) => {
    return EvmNative.create(jsonResponse.balance, 'wei');
  };

  public nftTransfer = (jsonResponse: components['schemas']['nftTransfer'], ) => {
    const data = toCamelCase(jsonResponse);
    EvmNftTransfer.create({
      ...data,
      chain: EvmChainResolver.resolve(params.chain, core),
      tokenAddress: EvmAddress.create(data.tokenAddress),
      toAddress: EvmAddress.create(data.toAddress),
      operator: data.operator ? EvmAddress.create(data.operator) : null,
      fromAddress: data.fromAddress ? EvmAddress.create(data.fromAddress) : null,
      value: data.value ? EvmNative.create(data.value) : null,
      blockTimestamp: new Date(data.block_timestamp),
    });
  };

  public nftTransferCollection = (_jsonResponse: components['schemas']['nftTransferCollection']) => {
    return this.paginatedResponse();
  };

  public block = (_jsonResponse: components['schemas']['block']) => {
    return `
    const data = toCamelCase(jsonResponse);
    EvmBlock.create(
        {
          ...data,
          chain: EvmChainResolver.resolve(params.chain, core),
          transactions: (data.transactions ?? []).map((transaction) =>
            EvmTransaction.create(
              {
                ...transaction,
                cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
                gasUsed: transaction.receiptGasUsed,
                index: transaction.transactionIndex,
                contractAddress: transaction.receiptContractAddress,
                receiptStatus: +transaction.receiptStatus,
                chain: EvmChainResolver.resolve(params.chain, core),
                data: transaction.input,
                from: transaction.fromAddress,
                blockNumber: +transaction.blockNumber,
                blockTimestamp: new Date(transaction.blockTimestamp),
                to: transaction.toAddress,
                logs: (transaction.logs ?? []).map((log) =>
                  EvmTransactionLog.create({
                    ...log,
                    blockNumber: +log.blockNumber,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
                    logIndex: +log.logIndex,
                    transactionIndex: +log.transactionIndex,
                    chain: log.chainId,
                  }),
                ),
              },
              core,
            ),
          ),
        },
        core,
      );`;
  };
}
