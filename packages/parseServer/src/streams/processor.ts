/* eslint-disable @typescript-eslint/no-explicit-any */
import { webhookRouter } from './webbhook';
import { MoralisCore } from 'moralis/core';
import { MoralisStreams } from '@moralisweb3/streams';
import { MoralisApiUtils } from '@moralisweb3/api-utils';

interface StreamOptions {
  webhookUrl?: string;
  apiKey: string;
}

export const streamsSync = (parseInstance: any, options: StreamOptions) => {
  const core = MoralisCore.create();
  const streams = MoralisStreams.create(core);
  const apiUtils = MoralisApiUtils.create(core);
  core.registerModules([streams, apiUtils]);
  core.start({ apiKey: options.apiKey });
  return webhookRouter(parseInstance, options?.webhookUrl || '/streams-webhook', streams);
};
