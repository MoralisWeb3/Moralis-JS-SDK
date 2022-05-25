import { MoralisServerError, ServerErrorCode } from '@moralisweb3/core';
import type Parse from 'parse';

const isValidInstance = (instance: unknown): instance is typeof Parse => {
  if (!instance) {
    return false;
  }

  if (!(instance as typeof Parse).serverURL) {
    return false;
  }

  return true;
};

export const assertInstance = (instance: unknown, message?: string) => {
  if (!isValidInstance(instance)) {
    throw new MoralisServerError({
      code: ServerErrorCode.NOT_INITIALIZED,
      message:
        message ?? 'Server not initialized. Make sure to have called Moralis.start() or MoralisServer.start() first.',
    });
  }

  return instance;
};
