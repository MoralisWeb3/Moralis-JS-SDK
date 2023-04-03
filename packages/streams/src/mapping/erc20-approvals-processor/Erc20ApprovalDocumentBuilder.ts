import { Block, IERC20Approval } from '@moralisweb3/streams-typings';
import { LogRelatedId } from '../common/LogRelatedId';
import { Document, TriggerItem } from '../storage';
import { TriggerItemsBuilder } from '../common/TriggerItemsBuilder';

export interface Erc20ApprovalDocument extends Document {
  id: string;

  transactionHash: string;
  contract: string;
  logIndex: string;
  owner: string;
  spender: string;
  value: string;

  tokenDecimals: number;
  tokenName: string;
  tokenSymbol: string;

  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
  chainId: number;
  triggers: TriggerItem[] | undefined;
}

export class Erc20ApprovalDocumentBuilder {
  public static build(
    approval: IERC20Approval,
    block: Block,
    confirmed: boolean,
    chainId: string,
  ): Erc20ApprovalDocument {
    const chain = Number(chainId);

    const document: Erc20ApprovalDocument = {
      id: LogRelatedId.create(chain, approval.transactionHash, approval.logIndex),

      transactionHash: approval.transactionHash,
      contract: approval.contract,
      logIndex: approval.logIndex,
      owner: approval.owner,
      spender: approval.spender,
      value: approval.value,

      tokenDecimals: parseInt(approval.tokenDecimals, 10),
      tokenName: approval.tokenName,
      tokenSymbol: approval.tokenSymbol,

      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
      chainId: chain,
      triggers: TriggerItemsBuilder.build(approval.triggers),
    };
    return document;
  }
}
