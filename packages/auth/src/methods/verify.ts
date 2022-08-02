import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { assertUnreachable } from '@moralisweb3/core';
import { completeChallenge } from '../resolvers/evmVerifyChallenge';

export interface VerifyEvmOptions {
  message: string;
  signature: string;
  network: 'evm';
}

export type VerifyOptions = VerifyEvmOptions;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeEvmVerify = (core: MoralisCore, { network, ...options }: VerifyEvmOptions) => {
  return EndpointResolver.create(core, completeChallenge).fetch({
    message: options.message,
    signature: options.signature,
  });
};

export const makeVerify = (core: MoralisCore) => (options: VerifyOptions) => {
  switch (options.network) {
    case 'evm':
      return makeEvmVerify(core, options);
    default:
      return assertUnreachable(options.network);
  }
};
