import { Block, INFTTransfer } from '@moralisweb3/streams-typings';
import { LogRelatedId } from '../common/LogRelatedId';
import { Document, TriggerItem } from '../storage';
import { TriggerItemsBuilder } from '../common/TriggerItemsBuilder';

export interface NftTransferDocument extends Document {
  id: string;

  transactionHash: string;
  contract: string;
  logIndex: string;

  operator: string | null;
  from: string;
  to: string;
  tokenId: string;
  amount: string;

  tokenContractType: string;
  tokenName: string;
  tokenSymbol: string;

  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
  chainId: number;
  triggers: TriggerItem[] | undefined;
}

export class NftTransferDocumentBuilder {
  public static build(transfer: INFTTransfer, block: Block, confirmed: boolean, chainId: string): NftTransferDocument {
    const chain = Number(chainId);

    const document: NftTransferDocument = {
      id: LogRelatedId.create(chain, transfer.transactionHash, transfer.logIndex),

      transactionHash: transfer.transactionHash,
      contract: transfer.contract,
      logIndex: transfer.logIndex,

      operator: transfer.operator,
      from: transfer.from,
      to: transfer.to,
      tokenId: transfer.tokenId,
      amount: transfer.amount,

      tokenContractType: transfer.tokenContractType,
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
