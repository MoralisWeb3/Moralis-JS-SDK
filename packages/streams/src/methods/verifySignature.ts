import { ApiUtilsConfig } from '@moralisweb3/api-utils';
import { Config, MoralisStreamError, StreamErrorCode } from '@moralisweb3/common-core';
import { IWebhook } from '@moralisweb3/streams-typings';
import { sha3 } from '../utils/sha3';
import { StreamsConfig } from '../config/StreamsConfig';

export interface VerifySignatureOptions {
  body: IWebhook;
  signature: string;
}

export const makeVerifySignature =
  (config: Config) =>
  ({ body, signature }: VerifySignatureOptions): boolean => {
    let secret = config.get(StreamsConfig.streamsSecret);
    if (!secret) {
      secret = config.get(ApiUtilsConfig.apiKey);
    }
    if (!secret) {
      throw new MoralisStreamError({
        code: StreamErrorCode.GENERIC_STREAM_ERROR,
        message: 'Unable to verify signature without an api key or streams secret',
      });
    }

    const generatedSignature = sha3(JSON.stringify(body) + secret);
    if (signature !== generatedSignature) {
      throw new MoralisStreamError({
        code: StreamErrorCode.INVALID_SIGNATURE,
        message: 'Signature is not valid',
      });
    }
    return true;
  };
