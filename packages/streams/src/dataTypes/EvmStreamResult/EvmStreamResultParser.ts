import MoralisCore from '@moralisweb3/core';
import { EvmSimpleBlock, EvmChain } from '@moralisweb3/evm-utils';
import {
  Block,
  IERC20Approval,
  IERC20Transfer,
  INFTApproval,
  INFTTransfer,
  Log,
  Transaction,
  InternalTransaction,
} from '@moralisweb3/streams-typings';
import { StreamErc20Approval } from '../StreamErc20Approval/StreamErc20Approval';
import { StreamErc20Transfer } from '../StreamErc20Transfer/StreamErc20Transfer';
import { StreamEvmInternalTransaction } from '../StreamEvmInternalTransaction/StreamEvmInternalTransaction';
import { StreamEvmNftApproval } from '../StreamEvmNftApproval/StreamEvmNftApproval';
import { StreamEvmNftTransfer } from '../StreamEvmNftTransfer/StreamEvmNftTransfer';
import { StreamEvmTransaction } from '../StreamEvmTransaction/StreamEvmTransaction';
import { StreamEvmTransactionLog } from '../StreamEvmTransactionLog/StreamEvmTransactionLog';
import { EvmStreamResultData, EvmStreamResultInput } from './types';

export class EvmStreamResultParser {
  static parse = (value: EvmStreamResultInput, core: MoralisCore): EvmStreamResultData => {
    const chain = this.parseChainId(value.chainId, core);

    return {
      chain,
      erc20Transfers: this.parseErc20Transfers(value.erc20Transfers, chain),
      erc20Approvals: this.parseErc20Approvals(value.erc20Approvals, chain),
      nftTransfers: this.parseNftTransfers(value.nftTransfers, chain),
      nftApprovals: this.parseNftApprovals(value.nftApprovals, chain),
      block: this.parseBlock(value.block, chain),
      logs: this.parseLogs(value.logs, chain),
      txs: this.parseTransactions(value.txs, chain),
      txsInternal: this.parseInternalTransactions(value.txsInternal, chain),
      abis: null,
      retries: value.retries,
      confirmed: value.confirmed,
    };
  };

  static parseChainId(value: string, core: MoralisCore) {
    return EvmChain.create(value, core);
  }

  static parseErc20Transfers(value: IERC20Transfer[], chain: EvmChain) {
    return value.map((transfer) =>
      StreamErc20Transfer.create({
        chain,

        transactionHash: transfer.transactionHash,
        address: transfer.tokenAddress,
        fromAddress: transfer.from,
        toAddress: transfer.to,
        value: transfer.value,

        logindex: +transfer.logIndex,
        tag: transfer.tag,
        tokenDecimals: transfer.tokenDecimals,
        tokenSymbol: transfer.tokenSymbol,
        valueWithDecimals: transfer.valueWithDecimals,
      }),
    );
  }

  static parseErc20Approvals(value: IERC20Approval[], chain: EvmChain) {
    return value.map((approval) =>
      StreamErc20Approval.create({
        ...approval,
        chain,
      }),
    );
  }

  static parseNftTransfers(value: INFTTransfer[], chain: EvmChain) {
    return value.map((transfer) =>
      StreamEvmNftTransfer.create({
        chain,

        transactionHash: transfer.transactionHash,
        tokenAddress: transfer.tokenAddress,
        logIndex: +transfer.logIndex,
        contractType: transfer.tokenContractType,
        operator: transfer.operator,
        fromAddress: transfer.from,
        toAddress: transfer.to,
        tokenId: transfer.tokenId,
        amount: transfer.amount,

        tag: transfer.tag,
        tokenName: transfer.tokenName,
        tokenSymbol: transfer.tokenSymbol,
      }),
    );
  }

  static parseNftApprovals(value: INFTApproval, chain: EvmChain) {
    return {
      ERC721: value.ERC721.map((approval) =>
        StreamEvmNftApproval.create({
          chain,
          ...approval,
        }),
      ),
      ERC1155: value.ERC1155.map((approval) =>
        StreamEvmNftApproval.create({
          chain,
          ...approval,
        }),
      ),
    };
  }

  static parseBlock(value: Block, chain: EvmChain) {
    return EvmSimpleBlock.create({
      chain,
      ...value,
    });
  }

  static parseLogs(value: Log[], chain: EvmChain) {
    return value.map((log) =>
      StreamEvmTransactionLog.create({
        chain,

        address: log.address,
        topics: [log.topic0, log.topic1, log.topic2, log.topic3].filter(isNotEmpty),
        data: log.data,
        logIndex: +log.logIndex,
        transactionHash: log.transactionHash,

        tag: log.tag,
        streamId: log.streamId,
        streamType: log.streamType,
      }),
    );
  }

  static parseTransactions(value: Transaction[], chain: EvmChain) {
    return value.map((transaction) => {
      const signature =
        transaction.v != null && transaction.r != null && transaction.s != null
          ? { v: +transaction.v, r: transaction.r, s: transaction.s }
          : undefined;

      return StreamEvmTransaction.create({
        chain,

        hash: transaction.hash,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice,
        nonce: transaction.nonce,
        data: transaction.input,
        index: transaction.transactionIndex,
        from: transaction.fromAddress,
        to: transaction.toAddress,
        value: transaction.value,
        type: transaction.type,
        cumulativeGasUsed: transaction.receiptCumulativeGasUsed,
        gasUsed: transaction.receiptGasUsed,
        contractAddress: transaction.receiptContractAddress,
        receiptRoot: transaction.receiptRoot,
        receiptStatus: transaction.receiptStatus,
        signature,

        tag: transaction.tag,
        streamId: transaction.streamId,
        streamType: transaction.streamType,
      });
    });
  }

  static parseInternalTransactions(value: InternalTransaction[], chain: EvmChain) {
    return value.map((transaction) =>
      StreamEvmInternalTransaction.create({
        chain,
        ...transaction,
      }),
    );
  }
}

export const isNotEmpty = <Value>(value: Value | null): value is Value => value !== null && value !== undefined;
