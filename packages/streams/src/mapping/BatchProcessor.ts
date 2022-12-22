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
    const nameBuilder = new CollectionNameBuilder();
    return new BatchProcessor(
      new Erc20ApprovalsProcessor(nameBuilder),
      new Erc20TransfersProcessor(nameBuilder),
      new InternalTxsProcessor(nameBuilder),
      new LogsProcessor(nameBuilder),
      new NftApprovalsProcessor(nameBuilder),
      new NftTransfersProcessor(nameBuilder),
      new TxsProcessor(nameBuilder),
    );
  }

  private constructor(
    private readonly erc20ApprovalsProcessor: Erc20ApprovalsProcessor,
    private readonly erc20TransfersProcessor: Erc20TransfersProcessor,
    private readonly internalTxsProcessor: InternalTxsProcessor,
    private readonly logsProcessor: LogsProcessor,
    private readonly nftApprovalsProcessor: NftApprovalsProcessor,
    private readonly nftTransfersProcessor: NftTransfersProcessor,
    private readonly txsProcessor: TxsProcessor,
  ) {}

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
