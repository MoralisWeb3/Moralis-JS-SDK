import { MoralisDataFormatted, MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { sha3 } from 'web3-utils';

export interface VerifySignatureOptions {
  body: MoralisDataFormatted;
  signature: string;
}

export const verifySignature = ({ body, signature }: VerifySignatureOptions, apiKey: string): boolean => {
  const generatedSignature = sha3(JSON.stringify(body) + apiKey);
  if (signature !== generatedSignature) {
    throw new MoralisStreamError({
      code: StreamErrorCode.INVALID_SIGNATURE,
      message: 'signature is not valid',
    });
  }
  return true;
};
