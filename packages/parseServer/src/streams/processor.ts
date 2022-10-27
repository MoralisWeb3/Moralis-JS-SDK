/* eslint-disable @typescript-eslint/no-explicit-any */
import { webhookRouter } from './webbhook';
import { Core } from 'moralis/common-core';
import { MoralisStreams } from '@moralisweb3/streams';
import { ApiUtils } from '@moralisweb3/api-utils';

interface StreamOptions {
  webhookUrl?: string;
  apiKey: string;
}

export const streamsSync = (parseInstance: any, options: StreamOptions) => {
  const core = Core.create();
  const streams = MoralisStreams.create(core);
  const apiUtils = ApiUtils.create(core);
  core.registerModules([streams, apiUtils]);
  core.start({ apiKey: options.apiKey });
  return webhookRouter(parseInstance, options?.webhookUrl || '/streams', streams);
};
