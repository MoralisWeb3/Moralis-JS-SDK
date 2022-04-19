/**
 * Creates a callback invoker that can be consumer by xState.
 */

import core, { EvmConnectOptions, Logger } from '@moralis/core';
import { InvokeCallback } from 'xstate';
import Parse from 'parse';
import { AuthType } from './AuthType';

// TODO: implement SOL authentication / Generalize to not using EVM
// TODO: Add correct response data and according types

export interface AuthenticatedData {
  user: any;
}

export interface SolConnectOptions {
  walletType: unknown;
}

export type AuthenticateEvmOptions = EvmConnectOptions & {
  network: 'evm';
};

export type AuthenticateSolOptions = SolConnectOptions & {
  network: 'sol';
};

export type AuthenticateOptions = AuthenticateEvmOptions | AuthenticateSolOptions;

/**
 * Creates the data for the authentication message by extending the message
 * with a unique string with applicationId and current time
 */
const createSigningData = async ({ message, server }: { message: string; server: typeof Parse }) => {
  const { dateTime } = await server.Cloud.run('getServerTime');
  const appId = core.config.get('appId');

  const data = `${message}\n\nId: ${appId}:${dateTime}`;

  return data;
};

const connectSignAndAuth = async ({ network }: AuthenticateOptions, server: typeof Parse, message: string) => {
  const module = core.modules.getNetwork(network);

  const { account } = await module.connect();
  const data = await createSigningData({ message, server });
  const signature = await module.signMessage(data);
  const authData = { id: account, signature, data };
  const user = await server.User.logInWith(AuthType.ETH, { authData });

  return {
    user,
  };
};

export const createAuthenticateCallback =
  (
    options: AuthenticateOptions,
    server: typeof Parse,
    message: string,
    logger: Logger,
  ): InvokeCallback<
    any,
    { type: 'AUTHENTICATING_SUCCESS'; data: AuthenticatedData } | { type: 'AUTHENTICATING_ERROR'; data: Error }
  > =>
  (callback, onReceive) => {
    logger.verbose(`Authenticating via evm with "${options.walletType}"`);

    connectSignAndAuth(options, server, message)
      .then(({ user }) => {
        callback({
          type: 'AUTHENTICATING_SUCCESS',
          data: {
            user,
          },
        });
      })
      .catch((error) => {
        callback({
          type: 'AUTHENTICATING_ERROR',
          data: error,
        });
      });

    // TODO: return a clean up fucntion to cancel the connect/import reqests
  };
