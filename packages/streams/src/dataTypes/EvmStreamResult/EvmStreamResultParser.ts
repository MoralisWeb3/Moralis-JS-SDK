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
      abi: value.abi,
      retries: value.retries,
      confirmed: value.confirmed,
    };
  };

  static parseChainId(value: string, core: MoralisCore) {
    // Use Ethereum as default, since we get an initial response with empty string as chain
    // TODO: fix this behaviour, this is only needed because of the initial webhook response
    return value === '' ? EvmChain.ETHEREUM : EvmChain.create(value, core);
  }

  static parseErc20Transfers(value: IERC20Transfer[], chain: EvmChain) {
    return value.map((transfer) =>
      StreamErc20Transfer.create({
        chain,
        ...transfer,
      }),
    );
  }

  static parseErc20Approvals(value: IERC20Approval[], chain: EvmChain) {
    return value.map((approval) => {
      return StreamErc20Approval.create({
        chain,
        ...approval,
      });
    });
  }

  static parseNftTransfers(value: INFTTransfer[], chain: EvmChain) {
    return value.map((transfer) =>
      StreamEvmNftTransfer.create({
        chain,
        ...transfer,
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
    // TODO: remove this behaviour, this is only needed because of the initial webhook response
    if (value.number === '') {
      return EvmSimpleBlock.create({
        chain,
        number: 0,
        hash: '',
        timestamp: '0',
      });
    }
    return EvmSimpleBlock.create({
      chain,
      ...value,
    });
  }

  static parseLogs(value: Log[], chain: EvmChain) {
    return value.map((log) =>
      StreamEvmTransactionLog.create({
        chain,
        ...log,
      }),
    );
  }

  static parseTransactions(value: Transaction[], chain: EvmChain) {
    return value.map((transaction) =>
      StreamEvmTransaction.create({
        chain,
        ...transaction,
      }),
    );
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
