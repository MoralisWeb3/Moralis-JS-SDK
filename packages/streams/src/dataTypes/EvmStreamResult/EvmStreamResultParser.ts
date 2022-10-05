/* eslint-disable etc/no-commented-out-code */
import MoralisCore from '@moralisweb3/core';
import { EvmSimpleBlock, EvmChain } from '@moralisweb3/evm-utils';
import {
  Block,
  IERC20Approval,
  IERC20Transfer,
  INFTApproval,
  INFTTransfer,
  InternalTransaction,
  Log,
  Transaction,
} from '@moralisweb3/streams-typings';
import { StreamErc1155Approval } from '../StreamErc1155Approval/StreamErc1155Approval';
import { StreamErc20Approval } from '../StreamErc20Approval/StreamErc20Approval';
import { StreamErc20Transfer } from '../StreamErc20Transfer/StreamErc20Transfer';
import { StreamErc721Approval } from '../StreamErc721Approval/StreamErc721Approval';
import { StreamEvmInternalTransaction } from '../StreamEvmInternalTransaction/StreamEvmInternalTransaction';
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
      abis: value.abis,
      retries: value.retries,
      confirmed: value.confirmed,
    };
  };

  static parseChainId(value: string, core: MoralisCore) {
    return EvmChain.create(value, core);
  }

  static parseErc20Transfers(value: IERC20Transfer[], chain: EvmChain) {
    return value.map((transfer) => {
      const { tokenDecimals, tokenName, tokenSymbol, contract, ...data } = transfer;
      return StreamErc20Transfer.create({
        ...data,
        chain,
        token: {
          contractAddress: contract,
          decimals: +tokenDecimals,
          name: tokenName,
          symbol: tokenSymbol,
        },
      });
    });
  }

  static parseErc20Approvals(value: IERC20Approval[], chain: EvmChain) {
    return value.map((approval) => {
      const { tokenDecimals, tokenName, tokenSymbol, contract, ...data } = approval;
      return StreamErc20Approval.create({
        ...data,
        chain,
        token: {
          contractAddress: contract,
          decimals: +tokenDecimals,
          name: tokenName,
          symbol: tokenSymbol,
        },
      });
    });
  }

  static parseNftTransfers(value: INFTTransfer[], chain: EvmChain) {
    return value.map((transfer) =>
      StreamEvmNftTransfer.create({
        chain,

        transactionHash: transfer.transactionHash,
        tokenAddress: transfer.contract,
        logIndex: transfer.logIndex,
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
        StreamErc721Approval.create({
          chain,
          ...approval,
        }),
      ),
      ERC1155: value.ERC1155.map((approval) =>
        StreamErc1155Approval.create({
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
        topic0: log.topic0,
        topic1: log.topic1,
        topic2: log.topic2,
        topic3: log.topic3,
        data: log.data,
        logIndex: +log.logIndex,
        transactionHash: log.transactionHash,

        tag: log.tag,
        streamId: log.streamId,
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
