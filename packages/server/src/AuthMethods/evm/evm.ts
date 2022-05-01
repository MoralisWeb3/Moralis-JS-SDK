import { createSigningData } from '../utils/createSigningData';
import { NetworkModule } from '@moralis/core';
import { AuthType } from '../types';

interface EvmAuthOptions {
  message: string;
  network: NetworkModule;
  connector: string;
  options?: Record<string, unknown>;
  server: typeof Parse;
}
export const evmAuth = async ({ message, network, connector, options, server }: EvmAuthOptions) => {
  const [{ account }, data] = await Promise.all([
    network.connect(connector, options),
    createSigningData({ message, server }),
  ]);
  const signature = await network.signMessage(data);

  if (!account) {
    throw new Error('Cannot sign message. No account provided via the evm connector');
  }
  if (!signature) {
    throw new Error('Message not signed');
  }

  const authData = { id: account.lowercase, signature, data };
  const user = await server.User.logInWith(AuthType.ETH, { authData });

  return {
    user,
  };
};

export type EvmBaseConnectOptions = Record<string, unknown>;
export type SolBaseConnectOptions = Record<string, unknown>;
