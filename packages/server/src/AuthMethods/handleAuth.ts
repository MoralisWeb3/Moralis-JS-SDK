import type Parse from 'parse';
import core, { MoralisServerError, ServerErrorCode } from '@moralis/core';
import { evmAuth } from './evm/evm';

// TODO: stricter types: based on method, and connectorname we have options etc.
interface HandleAuthOptions {
  message: string;
  // TODO: use enum / or plain string??
  method: 'evm' | 'sol' | 'password';
  options?: Record<string, unknown>;
  server: typeof Parse;
}

export const handleAuth = async ({ message, method, server, options }: HandleAuthOptions) => {
  if (method === 'evm') {
    const connector = typeof options?.connector === 'string' ? options?.connector : null;

    // TODO: it IS possible, if we allow for default connectors in MoralisEvm
    if (!connector) {
      throw new MoralisServerError({
        code: ServerErrorCode.AUTHENTICATION_FAILED,
        message: `Cannot authenticate to evm without a valid connector`,
      });
    }

    // TODO: custom error message if error is not found (we want authenticate error message, that is more descriptive)
    const network = core.modules.getNetwork('evm');

    console.log('Got network for authentication', network);

    const data = await evmAuth({ message, connector, options, network, server });

    return data;
  }

  throw new MoralisServerError({
    code: ServerErrorCode.AUTHENTICATION_METHOD_NOT_SUPPORTED,
    message: `Authenticationmethod "${method}" is not supported`,
  });
};
