import type Parse from 'parse';
import core, { MoralisServerError, ServerErrorCode } from '@moralisweb3/core';
import { evmAuth } from './evm/evm';
import { AuthMethod } from './types';

interface HandleAuthOptions {
  message: string;
  method: AuthMethod;
  options?: Record<string, unknown>;
  server: typeof Parse;
}

export const handleAuth = async ({ message, method, server, options }: HandleAuthOptions) => {
  if (method === AuthMethod.EVM) {
    const connector = typeof options?.connector === 'string' ? options?.connector : null;

    if (!connector) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: `Cannot authenticate to evm without a valid connector`,
      });
    }

    const network = core.modules.getNetwork('evm');

    const data = await evmAuth({ message, connector, options, network, server });

    return data;
  }

  throw new MoralisServerError({
    code: ServerErrorCode.AUTHENTICATION_METHOD_NOT_SUPPORTED,
    message: `Authenticationmethod "${method}" is not supported`,
  });
};
