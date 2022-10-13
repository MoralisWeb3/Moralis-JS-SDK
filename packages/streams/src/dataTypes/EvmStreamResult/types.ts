import { EvmChain, EvmSimpleBlock } from '@moralisweb3/evm-utils';
import { IWebhook } from '@moralisweb3/streams-typings';
import { StreamErc1155Approval } from '../StreamErc1155Approval/StreamErc1155Approval';
import { StreamErc20Approval } from '../StreamErc20Approval/StreamErc20Approval';
import { StreamErc20Transfer } from '../StreamErc20Transfer/StreamErc20Transfer';
import { StreamErc721Approval } from '../StreamErc721Approval/StreamErc721Approval';
import { StreamEvmInternalTransaction } from '../StreamEvmInternalTransaction/StreamEvmInternalTransaction';
import { StreamEvmNftTransfer } from '../StreamEvmNftTransfer/StreamEvmNftTransfer';
import { StreamEvmTransaction } from '../StreamEvmTransaction/StreamEvmTransaction';
import { StreamEvmTransactionLog } from '../StreamEvmTransactionLog/StreamEvmTransactionLog';

export interface EvmStreamResultData {
  erc20Transfers: StreamErc20Transfer[];
  erc20Approvals: StreamErc20Approval[];
  nftTransfers: StreamEvmNftTransfer[];
  nftApprovals: {
    ERC721: StreamErc721Approval[];
    ERC1155: StreamErc1155Approval[];
  };
  block: EvmSimpleBlock;
  chain: EvmChain;
  logs: StreamEvmTransactionLog[];
  txs: StreamEvmTransaction[];
  txsInternal: StreamEvmInternalTransaction[];
  abi: any[];
  retries: number;
  confirmed: boolean;
}

export type EvmStreamResultInput = IWebhook;
