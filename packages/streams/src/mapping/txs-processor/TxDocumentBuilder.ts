import { Block, Transaction } from '@moralisweb3/streams-typings';
import { TxRelatedId } from '../common/TxRelatedId';
import { Document, TriggerItem } from '../storage/Update';
import { TriggerItemsBuilder } from '../common/TriggerItemsBuilder';

export interface TxDocument extends Document {
  id: string;
  hash: string;
  chainId: number;
  transactionIndex: number;
  gas: number;
  gasPrice: number;
  nonce: number;
  fromAddress: string;
  toAddress: string | null;
  value: string;
  input: string | null;
  type: number;
  receiptStatus: number;
  receiptGasUsed: number;
  receiptCumulativeGasUsed: number;
  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
  triggers: TriggerItem[] | undefined;
}

export class TxDocumentBuilder {
  public static build(tx: Transaction, block: Block, confirmed: boolean, chainId: string): TxDocument {
    const chain = Number(chainId);
    return {
      id: TxRelatedId.create(chain, tx.hash),
      hash: tx.hash,
      chainId: chain,
      transactionIndex: parseInt(tx.transactionIndex, 10),
      gas: parseInt(tx.gas as string, 10),
      gasPrice: parseInt(tx.gasPrice as string, 10),
      nonce: parseInt(tx.nonce as string, 10),
      fromAddress: tx.fromAddress,
      toAddress: tx.toAddress,
      value: tx.value || '0',
      input: tx.input,
      type: parseInt(tx.type as string, 10),
      receiptStatus: parseInt(tx.receiptStatus as string, 10),
      receiptGasUsed: parseInt(tx.receiptGasUsed as string, 10),
      receiptCumulativeGasUsed: parseInt(tx.receiptCumulativeGasUsed as string, 10),
      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
      triggers: TriggerItemsBuilder.build(tx.triggers),
    };
  }
}
