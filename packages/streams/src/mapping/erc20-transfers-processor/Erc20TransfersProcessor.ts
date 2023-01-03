import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage';
import { Erc20TransferDocument, Erc20TransferDocumentBuilder } from './Erc20TransferDocumentBuilder';

export class Erc20TransfersProcessor {
  private readonly simpleProcessor = new SimpleProcessor(
    this.collectionNameBuilder,
    Erc20TransferDocumentBuilder.build,
  );

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): Erc20TransferUpdate[] {
    return this.simpleProcessor.process(batch.erc20Transfers, batch);
  }
}

export interface Erc20TransferUpdate extends Update<Erc20TransferDocument> {}
