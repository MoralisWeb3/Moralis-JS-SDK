import { Block, IERC20Transfer } from '@moralisweb3/streams-typings';
import { LogRelatedId } from '../common/LogRelatedId';
import { Document, TriggerItem } from '../storage';
import { TriggerItemsBuilder } from '../common/TriggerItemsBuilder';

export interface Erc20TransferDocument extends Document {
  id: string;

  transactionHash: string;
  contract: string;
  logIndex: string;
  from: string;
  to: string;
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

export class Erc20TransferDocumentBuilder {
  public static build(
    transfer: IERC20Transfer,
    block: Block,
    confirmed: boolean,
    chainId: string,
  ): Erc20TransferDocument {
    const chain = Number(chainId);

    const document: Erc20TransferDocument = {
      id: LogRelatedId.create(chain, transfer.transactionHash, transfer.logIndex),

      transactionHash: transfer.transactionHash,
      contract: transfer.contract,
      logIndex: transfer.logIndex,
      from: transfer.from,
      to: transfer.to,
      value: transfer.value,

      tokenDecimals: parseInt(transfer.tokenDecimals, 10),
      tokenName: transfer.tokenName,
      tokenSymbol: transfer.tokenSymbol,

      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
      chainId: chain,
      triggers: TriggerItemsBuilder.build(transfer.triggers),
    };
    return document;
  }
}
