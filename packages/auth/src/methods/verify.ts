import { assertUnreachable } from '@moralisweb3/core';
import { AuthApi } from '../AuthApi/AuthApi';

export interface SignMessageEvmOptions {
  message: string;
  signature: string;
  network: 'evm';
}

export type SignMessageOptions = SignMessageEvmOptions;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const makeEvmVerify = ({ network, ...options }: SignMessageEvmOptions) => {
  return AuthApi.verify({
    message: options.message,
    signature: options.signature,
  });
};

export const makeVerify = () => (options: SignMessageOptions) => {
  switch (options.network) {
    case 'evm':
      return makeEvmVerify(options);
    default:
      return assertUnreachable(options.network);
  }
};
