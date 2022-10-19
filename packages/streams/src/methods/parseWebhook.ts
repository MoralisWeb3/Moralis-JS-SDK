import { IWebhook } from '@moralisweb3/streams-typings';
import { EvmStreamResult } from '@moralisweb3/common-streams-utils';

export const parseWebhook = (webhook: IWebhook) => {
  const streamResult = EvmStreamResult.create(webhook);

  return streamResult;
};
