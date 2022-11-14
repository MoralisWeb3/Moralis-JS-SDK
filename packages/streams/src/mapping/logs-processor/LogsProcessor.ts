import { IWebhook } from '@moralisweb3/streams-typings';

import { CollectionNameBuilder } from '../core/CollectionNameBuilder';
import { LogParser } from './LogParser';
import { LogDocument, LogDocumentBuilder } from './LogDocumentBuilder';
import { Update } from '../storage/Update';

export class LogsProcessor {
  public constructor(private readonly collectionNameBuilder: CollectionNameBuilder) {}

  public process(batch: IWebhook): LogDocumentUpdate[] {
    const updates: LogDocumentUpdate[] = [];

    if (batch.abi.length < 1) {
      return updates;
    }

    const logParser = new LogParser(batch.abi);

    for (const log of batch.logs) {
      const logParams = logParser.read(log);
      const document = LogDocumentBuilder.build(log, logParams, batch.block, batch.confirmed, batch.chainId);

      updates.push({
        collectionName: this.collectionNameBuilder.build(batch.tag),
        document,
      });
    }

    return updates;
  }
}

export interface LogDocumentUpdate extends Update<LogDocument> {
  collectionName: string;
  document: LogDocument;
}
