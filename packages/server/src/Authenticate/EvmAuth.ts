/**
 * Creates a callback invoker that can be consumer by xState.
 */

import core, {
  EvmBaseConnectOptions,
  Logger,
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
} from '@moralis/core';
import { InvokeCallback } from 'xstate';
import type Parse from 'parse';
import { AuthType } from './AuthType';

// TODO: implement SOL authentication / Generalize to not using EVM
// TODO: Add correct response data and according types

// WIP: return user
export type AuthenticateData = { user: any };

// TODO: combine this data type with the sharedType EvmConnect
export type EvmAuthenticate = {
  (network: 'evm', wallet: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<AuthenticateData>;
  (network: 'evm', wallet: 'walletconnect', options?: EvmWalletConnectConnectorOptions): Promise<AuthenticateData>;
  (network: string, wallet: string, options?: EvmBaseConnectOptions): Promise<AuthenticateData>;
};

export interface AuthenticateEventOptions {
  network: string;
  wallet: string;
  options?: unknown;
}

// export interface SolConnectOptions {
//   wallet: unknown;
// }

// export type AuthenticateEvmOptions = EvmBaseConnectOptions & {
//   network: 'evm';
// };

// export type AuthenticateSolOptions = SolConnectOptions & {
//   network: 'sol';
// };

// export type AuthenticateOptions = AuthenticateEvmOptions | AuthenticateSolOptions;

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

const connectSignAndAuth = async (
  { network, wallet }: AuthenticateEventOptions,
  server: typeof Parse,
  message: string,
) => {
  const module = core.modules.getNetwork(network);

  const { account } = await module.connect(wallet);
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
    options: AuthenticateEventOptions,
    server: typeof Parse,
    message: string,
    logger: Logger,
  ): InvokeCallback<
    any,
    { type: 'AUTHENTICATING_SUCCESS'; data: AuthenticateData } | { type: 'AUTHENTICATING_ERROR'; data: Error }
  > =>
  (callback, onReceive) => {
    logger.verbose(`Authenticating via evm with "${options.wallet}"`);

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
