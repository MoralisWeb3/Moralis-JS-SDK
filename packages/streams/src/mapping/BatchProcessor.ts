import { IWebhook } from '@moralisweb3/streams-typings';
import { CollectionNameBuilder } from './common';
import { Erc20ApprovalsProcessor } from './erc20-approvals-processor';
import { Erc20TransfersProcessor } from './erc20-transfers-processor';
import { InternalTxsProcessor } from './internal-txs-processor';
import { LogsProcessor } from './logs-processor';
import { NftApprovalsProcessor } from './nft-approvals-processor';
import { NftTransfersProcessor } from './nft-transfers-processor';
import { TxsProcessor } from './txs-processor';

export class BatchProcessor {
  public static create(): BatchProcessor {
    return new BatchProcessor(new CollectionNameBuilder());
  }

  private readonly erc20ApprovalsProcessor = new Erc20ApprovalsProcessor(this.collectionNameBuilder);
  private readonly erc20TransfersProcessor = new Erc20TransfersProcessor(this.collectionNameBuilder);
  private readonly internalTxsProcessor = new InternalTxsProcessor(this.collectionNameBuilder);
  private readonly logsProcessor = new LogsProcessor(this.collectionNameBuilder);
  private readonly nftApprovalsProcessor = new NftApprovalsProcessor(this.collectionNameBuilder);
  private readonly nftTransfersProcessor = new NftTransfersProcessor(this.collectionNameBuilder);
  private readonly txsProcessor = new TxsProcessor(this.collectionNameBuilder);

  private constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook) {
    return {
      erc20Approvals: () => this.erc20ApprovalsProcessor.process(batch),
      erc20Transfers: () => this.erc20TransfersProcessor.process(batch),
      internalTxs: () => this.internalTxsProcessor.process(batch),
      logs: () => this.logsProcessor.process(batch),
      nftApprovals: () => this.nftApprovalsProcessor.process(batch),
      nftTransfers: () => this.nftTransfersProcessor.process(batch),
      txs: () => this.txsProcessor.process(batch),
    };
  }
}
