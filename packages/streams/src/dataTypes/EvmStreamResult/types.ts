import {
  Erc20Transfer,
  EvmChain,
  EvmNftTransfer,
  EvmSimpleBlock,
  EvmTransaction,
  EvmTransactionLog,
} from '@moralisweb3/evm-utils';
import { IWebhook } from '@moralisweb3/streams-typings';
import { Erc20Approval } from '../StreamErc20Approval/StreamErc20Approval';
import { EvmInternalTransaction } from '../StreamEvmInternalTransaction/StreamEvmInternalTransaction';
import { EvmNftApproval } from '../StreamEvmNftApproval/StreamEvmNftApproval';

export interface EvmStreamResultData {
  erc20Transfers: Erc20Transfer[];
  erc20Approvals: Erc20Approval[];
  nftTransfers: EvmNftTransfer[];
  nftApprovals: {
    ERC721: EvmNftApproval[];
    ERC1155: EvmNftApproval[];
  };
  block: EvmSimpleBlock;
  chain: EvmChain;
  logs: EvmTransactionLog[];
  txs: EvmTransaction[];
  txsInternal: EvmInternalTransaction[];
  abis: any;
  retries: number;
  confirmed: boolean;
}

export type EvmStreamResultInput = IWebhook;
