import { Block, InternalTransaction } from '@moralisweb3/streams-typings';
import { Document } from '../storage/Update';

import { InternalTxDocumentId } from './InternalTxDocumentId';

export interface InternalTxDocument extends Document {
  id: string;
  hash: string;
  chainId: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
}

export class InternalTxDocumentBuilder {
  public static build(tx: InternalTransaction, block: Block, confirmed: boolean, chainId: string): InternalTxDocument {
    const chain = Number(chainId);
    return {
      id: InternalTxDocumentId.create(chain, tx.transactionHash),
      hash: tx.transactionHash,
      chainId: chain,
      from: tx.from as string,
      to: tx.to as string,
      value: tx.value as string,
      gas: parseInt(tx.gas || '0', 10),
      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
    };
  }
}
