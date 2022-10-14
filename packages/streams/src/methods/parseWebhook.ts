import { IWebhook } from '@moralisweb3/streams-typings';
import { EvmStreamResult } from '../dataTypes';

export const parseWebhook = (webhook: IWebhook) => {
  const streamResult = EvmStreamResult.create(webhook);

  return streamResult;
};
