/* eslint-disable @typescript-eslint/no-explicit-any */
import { webhookRouter } from './webbhook';
import { Core } from '@moralisweb3/common-core';
import { Streams } from '@moralisweb3/streams';
import { ApiUtils } from '@moralisweb3/api-utils';

interface StreamOptions {
  webhookUrl?: string;
  apiKey: string;
}

export const streamsSync = (parseInstance: any, options: StreamOptions) => {
  const core = Core.create();
  const streams = Streams.create(core);
  const apiUtils = ApiUtils.create(core);
  core.registerModules([streams, apiUtils]);
  core.start({ apiKey: options.apiKey });
  return webhookRouter(parseInstance, options?.webhookUrl || '/streams-webhook', streams);
};
