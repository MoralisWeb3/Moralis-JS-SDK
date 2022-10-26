import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../core/CollectionNameBuilder';
import { Update } from '../storage/Update';
import { InternalTxDocument, InternalTxDocumentBuilder } from './InternalTxDocumentBuilder';

export class InternalTxsProcessor {
  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): InternalTxDocumentUpdate[] {
    const updates: InternalTxDocumentUpdate[] = [];

    for (const internalTx of batch.txsInternal) {
      const document = InternalTxDocumentBuilder.build(internalTx, batch.block, batch.confirmed, batch.chainId);

      updates.push({
        collectionName: this.collectionNameBuilder.build(batch.tag),
        document,
      });
    }

    return updates;
  }
}

export interface InternalTxDocumentUpdate extends Update<InternalTxDocument> {
  collectionName: string;
  document: InternalTxDocument;
}
