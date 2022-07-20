import { assertUnreachable } from '@moralisweb3/core';
import { completeChallengeResolver } from '../resolvers/completeChallenge';

export interface VerifyEvmOptions {
  message: string;
  signature: string;
  network: 'evm';
}

export type VerifyOptions = VerifyEvmOptions;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeEvmVerify = ({ network, ...options }: VerifyEvmOptions) => {
  return completeChallengeResolver.fetch({
    message: options.message,
    signature: options.signature,
  });
};

export const makeVerify = () => (options: VerifyOptions) => {
  switch (options.network) {
    case 'evm':
      return makeEvmVerify(options);
    default:
      return assertUnreachable(options.network);
  }
};
