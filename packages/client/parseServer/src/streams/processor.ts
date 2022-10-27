/* eslint-disable @typescript-eslint/no-explicit-any */
import Moralis from 'moralis';
import { Express } from 'express';
import { tagsMap, webhookRouter } from './webbhook';

interface streamConfig {
  tableName: string;
  tag: string;
}
interface StreamOptions {
  apiKey: string;
  webhookUrl: string;
  streamConfig: streamConfig[];
}

const prepareSyncs = async (parseObject: any, syncs: streamConfig[]) => {
  const dbAdapter = parseObject.config.databaseController.adapter;
  const results: unknown[] = [];
  for (const sync of syncs) {
    results.push(
      dbAdapter.ensureUniqueness(sync.tableName.concat('Txs'), { fields: { transactionIndex: {} } }, [
        'transactionIndex',
      ]),
    );

    results.push(dbAdapter.ensureUniqueness(sync.tableName.concat('TxsInternal'), { fields: { hash: {} } }, ['hash']));

    results.push(
      dbAdapter.ensureUniqueness(sync.tableName.concat('Logs'), { fields: { logIndex: {}, transactionHash: {} } }, [
        'logIndex',
        'transactionHash',
      ]),
    );

    tagsMap.set(sync.tag, sync);
  }
  await Promise.all(results);
};

const initializeSyncsPlugin = async (
  parseObject: any,
  express: Express,
  apiKey: string,
  webhookUrl: string,
  syncs: streamConfig[],
) => {
  if (syncs.length === 0) {
    // We don't want to initialize the plugin if there are no syncs
    return;
  }

  await prepareSyncs(parseObject, syncs);

  Moralis.start({
    apiKey,
  });

  webhookRouter(express, parseObject, webhookUrl);
};

export const initializeStreams = (parse: any, express: Express, options: StreamOptions) =>
  initializeSyncsPlugin(parse, express, options.apiKey, options.webhookUrl, options.streamConfig);
