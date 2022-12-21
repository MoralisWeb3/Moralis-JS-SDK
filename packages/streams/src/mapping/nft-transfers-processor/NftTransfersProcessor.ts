import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage';
import { NftTransferDocument, NftTransferDocumentBuilder } from './NftTransferDocumentBuilder';

export class NftTransfersProcessor {
  private readonly simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, NftTransferDocumentBuilder.build);

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): NftTransferUpdate[] {
    return this.simpleProcessor.process(batch.nftTransfers, batch);
  }
}

export interface NftTransferUpdate extends Update<NftTransferDocument> {}
