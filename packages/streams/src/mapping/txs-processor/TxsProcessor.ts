import { IWebhook } from '@moralisweb3/streams-typings';

import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage/Update';
import { TxDocument, TxDocumentBuilder } from './TxDocumentBuilder';

export class TxsProcessor {
  private readonly processor = new SimpleProcessor(this.collectionNameBuilder, TxDocumentBuilder.build);

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): TxDocumentUpdate[] {
    return this.processor.process(batch.txs, batch);
  }
}

export interface TxDocumentUpdate extends Update<TxDocument> {}
