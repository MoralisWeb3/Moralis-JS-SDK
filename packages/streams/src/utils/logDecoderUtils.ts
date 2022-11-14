import { IWebhook } from '@moralisweb3/streams-typings';

export const hasAbis = (webhookData: IWebhook) => {
  if (!webhookData.abi || webhookData.abi.length < 1) {
    return false;
  }

  return true;
};

export const isWebhook = (webhookData: IWebhook) => {
  if (typeof webhookData !== 'object' || webhookData === null || !('logs' in webhookData)) {
    return false;
  }

  return true;
};

export const isNotEmpty = <Value>(value: Value | null): value is Value => value !== null && value !== undefined;
