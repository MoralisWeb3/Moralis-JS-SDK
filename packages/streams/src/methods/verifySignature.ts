import { ApiUtilsConfig } from '@moralisweb3/api-utils';
import { Core, MoralisStreamError, StreamErrorCode } from '@moralisweb3/common-core';
import { IWebhook } from '@moralisweb3/streams-typings';
import { sha3 } from '../utils/sha3';

export interface VerifySignatureOptions {
  body: IWebhook;
  signature: string;
}

export const makeVerifySignature =
  (core: Core) =>
  ({ body, signature }: VerifySignatureOptions): boolean => {
    const apiKey = core.config.get(ApiUtilsConfig.apiKey);
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
