import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from '../common';
import { SimpleProcessor } from '../common/SimpleProcessor';
import { Update } from '../storage';
import { NftApprovalDocumentBuilder, NftApprovalDocument } from './NftApprovalDocumentBuilder';

export class NftApprovalsProcessor {
  private readonly simpleProcessor = new SimpleProcessor(this.collectionNameBuilder, NftApprovalDocumentBuilder.build);

  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): NftApprovalUpdate[] {
    return this.simpleProcessor.process(batch.nftTokenApprovals, batch);
  }
}

export interface NftApprovalUpdate extends Update<NftApprovalDocument> {}
