import { EvmSimpleBlock, EvmChain } from '@moralisweb3/common-evm-utils';
import {
  Block,
  IERC20Approval,
  IERC20Transfer,
  INFTTransfer,
  InternalTransaction,
  IOldNFTApproval,
  Log,
  Transaction,
  INativeBalance,
  INFTApproval,
} from '@moralisweb3/streams-typings';
import { StreamErc1155Approval } from '../StreamErc1155Approval/StreamErc1155Approval';
import { StreamErc20Approval } from '../StreamErc20Approval/StreamErc20Approval';
import { StreamErc20Transfer } from '../StreamErc20Transfer/StreamErc20Transfer';
import { StreamErc721Approval } from '../StreamErc721Approval/StreamErc721Approval';
import { StreamEvmInternalTransaction } from '../StreamEvmInternalTransaction/StreamEvmInternalTransaction';
import { StreamEvmNftTransfer } from '../StreamEvmNftTransfer/StreamEvmNftTransfer';
import { StreamEvmTransaction } from '../StreamEvmTransaction/StreamEvmTransaction';
import { StreamEvmTransactionLog } from '../StreamEvmTransactionLog/StreamEvmTransactionLog';
import { StreamNativeBalance } from '../StreamNativeBalance';
import { EvmStreamResultData, EvmStreamResultInput } from './types';
import { StreamEvmNftTokenApproval } from '../StreamEvmNftTokenApproval/StreamEvmNftTokenApproval';

export class EvmStreamResultParser {
  static parse = (value: EvmStreamResultInput): EvmStreamResultData => {
    const chain = this.parseChainId(value.chainId);

    return {
      chain,
      erc20Transfers: this.parseErc20Transfers(value.erc20Transfers, chain),
      erc20Approvals: this.parseErc20Approvals(value.erc20Approvals, chain),
      nftTransfers: this.parseNftTransfers(value.nftTransfers, chain),
      nftApprovals: this.parseNftApprovals(value.nftApprovals, chain),
      ntfTokenApprovals: this.parseNftTokenApprovals(value.nftTokenApprovals, chain),
      block: this.parseBlock(value.block, chain),
      logs: this.parseLogs(value.logs, chain),
      txs: this.parseTransactions(value.txs, chain),
      txsInternal: this.parseInternalTransactions(value.txsInternal, chain),
      abi: value.abi,
      retries: value.retries,
      confirmed: value.confirmed,
      streamId: value.streamId,
      tag: value.tag,
      nativeBalances: this.parseNativeBalances(value.nativeBalances),
    };
  };

  static parseChainId(value: string) {
    // Only needed for the initial test-response where we get an empty string as chain
    return value === '' ? EvmChain.ETHEREUM : EvmChain.create(value);
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

  static parseNftApprovals(value: IOldNFTApproval, chain: EvmChain) {
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

  static parseNftTokenApprovals(values: INFTApproval[], chain: EvmChain) {
    return values.map((value) =>
      StreamEvmNftTokenApproval.create({
        chain,
        ...value,
      }),
    );
  }

  static parseBlock(value: Block, chain: EvmChain) {
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

  static parseNativeBalances(value: INativeBalance[]) {
    return value.map((nativeBalance) => StreamNativeBalance.create(nativeBalance));
  }
}
