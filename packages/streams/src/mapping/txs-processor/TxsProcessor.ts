import { IWebhook } from '@moralisweb3/streams-typings';

import { CollectionNameBuilder } from '../core/CollectionNameBuilder';
import { Update } from '../storage/Update';
import { TxDocument, TxDocumentBuilder } from './TxDocumentBuilder';

export class TxsProcessor {
  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): TxDocumentUpdate[] {
    const updates: TxDocumentUpdate[] = [];

    for (const tx of batch.txs) {
      const document = TxDocumentBuilder.build(tx, batch.block, batch.confirmed, batch.chainId);

      updates.push({
        collectionName: this.collectionNameBuilder.build(batch.tag),
        document,
      });
    }

    return updates;
  }
}

export interface TxDocumentUpdate extends Update<TxDocument> {
  collectionName: string;
  document: TxDocument;
}
