import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common/CollectionNameBuilder';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage/Update';
import { InternalTxDocument, InternalTxDocumentBuilder } from './InternalTxDocumentBuilder';

export class InternalTxsProcessor {
  private readonly simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, InternalTxDocumentBuilder.build);

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): InternalTxDocumentUpdate[] {
    return this.simpleProcessor.process(batch.txsInternal, batch);
  }
}

export interface InternalTxDocumentUpdate extends Update<InternalTxDocument> {}
