import { ApiErrorCode, isMoralisError } from '@moralisweb3/core';

export function isNotFoundError(e: unknown): boolean {
  if (isMoralisError(e)) {
    if (e.details?.status === 404) {
      return true;
    }
    if (e.code === ApiErrorCode.NOT_FOUND) {
      return true;
    }
  }
  return false;
}
