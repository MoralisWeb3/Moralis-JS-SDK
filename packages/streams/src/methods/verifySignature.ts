import { ApiConfig } from '@moralisweb3/api-utils';
import MoralisCore, { MoralisDataFormatted, MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { sha3 } from '../utils';

export interface VerifySignatureOptions {
  body: MoralisDataFormatted;
  signature: string;
}

export const makeVerifySignature =
  (core: MoralisCore) =>
  ({ body, signature }: VerifySignatureOptions): boolean => {
    const apiKey = core.config.get(ApiConfig.apiKey);
    if (!apiKey) {
      throw new MoralisStreamError({
        code: StreamErrorCode.GENERIC_STREAM_ERROR,
        message: 'unable to verify signature without an api key',
      });
    }
    const generatedSignature = sha3(JSON.stringify(body) + apiKey);
    if (signature !== generatedSignature) {
      throw new MoralisStreamError({
        code: StreamErrorCode.INVALID_SIGNATURE,
        message: 'signature is not valid',
      });
    }
    return true;
  };
