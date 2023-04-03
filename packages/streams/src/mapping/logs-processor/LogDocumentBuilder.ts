import { Block, Log } from '@moralisweb3/streams-typings';

import { ParsedLog } from './LogParser';
import { LogDocumentValueFormatter } from './LogDocumentValueFormatter';
import { ParamNameResolver } from './ParamNameResolver';
import { Document, TriggerItem } from '../storage/Update';
import { LogRelatedId } from '../common/LogRelatedId';
import { TriggerItemsBuilder } from '../common/TriggerItemsBuilder';

interface BaseLogDocument {
  id: string;
  name: string;
  logIndex: number;
  transactionHash: string;
  address: string;
  blockHash: string;
  blockTimestamp: number;
  blockNumber: number;
  confirmed: boolean;
  chainId: number;
  triggers: TriggerItem[] | undefined;
}

export interface LogDocument extends BaseLogDocument, Document {
  [paramName: string]: LogDocumentValue;
}

export type LogDocumentValue = string | number | boolean | object | undefined;

const paramNames: (keyof BaseLogDocument)[] = [
  'id',
  'name',
  'logIndex',
  'transactionHash',
  'address',
  'blockHash',
  'blockTimestamp',
  'blockNumber',
  'confirmed',
  'chainId',
  'triggers',
];

const restrictedParamNames: string[] = [
  ...paramNames,
  // Some extra names
  '_id',
  'uniqueId',
  'updatedAt',
  'createdAt',
  'user',
  'userId',
];

export class LogDocumentBuilder {
  public static build(log: Log, parsedLog: ParsedLog, block: Block, confirmed: boolean, chainId: string): LogDocument {
    const nameResolver = new ParamNameResolver(restrictedParamNames);
    const chain = Number(chainId);

    const document: LogDocument = {
      id: LogRelatedId.create(chain, log.transactionHash, log.logIndex),
      name: parsedLog.name,
      logIndex: parseInt(log.logIndex, 10),
      transactionHash: log.transactionHash,
      address: log.address,
      blockHash: block.hash,
      blockTimestamp: parseInt(block.timestamp, 10),
      blockNumber: parseInt(block.number, 10),
      confirmed,
      chainId: chain,
      triggers: TriggerItemsBuilder.build(log.triggers),
    };

    nameResolver.iterate(parsedLog.params, (safeParamName, paramValue) => {
      document[safeParamName] = LogDocumentValueFormatter.format(paramValue);
    });
    return document;
  }
}
