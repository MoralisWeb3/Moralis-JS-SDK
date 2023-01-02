import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage';
import { Erc20ApprovalDocument, Erc20ApprovalDocumentBuilder } from './Erc20ApprovalDocumentBuilder';

export class Erc20ApprovalsProcessor {
  private readonly processor = new SimpleProcessor(this.collectionNameBuilder, Erc20ApprovalDocumentBuilder.build);

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): Erc20ApprovalUpdate[] {
    return this.processor.process(batch.erc20Approvals, batch);
  }
}

export interface Erc20ApprovalUpdate extends Update<Erc20ApprovalDocument> {}
