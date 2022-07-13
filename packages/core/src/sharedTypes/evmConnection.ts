/**
 * Type definitions that are used in multiple packages
 */

import { EvmAddress } from '../dataTypes/EvmAddress';
import { EvmChain } from '../dataTypes/EvmChain';
import { InputChainId } from '../dataTypes/EvmChainish';
import { EvmProvider } from './EvmProvider';

// Evm connections
export type EvmBaseConnectOptions = Record<string, unknown>;
export type SolBaseConnectOptions = Record<string, unknown>;

export type EvmConnect = {
  (connector: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<EvmConnectionData>;
  (connector: 'walletconnect', options?: EvmWalletConnectConnectorOptions): Promise<EvmConnectionData>;
  (connector: 'magiclink', options?: EvmMagicLinkConnectorOptions): Promise<EvmConnectionData>;
  (connector: string, options?: EvmBaseConnectOptions): Promise<EvmConnectionData>;
};

export type SolConnect = {
  (connector: 'phantom', options?: SolPhantomConnectorConnectOptions): Promise<EvmConnectionData>;
  (connector: string, options?: EvmBaseConnectOptions): Promise<EvmConnectionData>;
};

export interface SolPhantomConnectorConnectOptions extends SolBaseConnectOptions {
  debug: true;
}

export interface EvmMetamaskConnectorConnectOptions extends EvmBaseConnectOptions {
  // Whether error messages should be logged to the console. Does not affect errors thrown due to invalid options
  silent?: boolean;
  // How many milliseconds to wait for asynchronously injected providers
  timeout?: number;
}

export interface EvmWalletConnectConnectorOptions extends EvmBaseConnectOptions {
  // Prefered chainId, if supported by the connector
  chainId?: InputChainId;
  // List of mobile links
  mobileLinks?: string[];
  // Weather to reuse the same session (if available), or to force a new session
  newSession?: boolean;
}

export interface EvmMagicLinkConnectorOptions extends EvmBaseConnectOptions {
  // Prefered chainId, if supported by the connector
  chainId?: InputChainId;
  // the publishable api-key that you can get in your Magic dashboard
  apiKey: string;
  // Email to sign in with
  email: string;
  // Weather to reuse the same session (if available), or to force a new session
  newSession?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyConnector = any;

export interface EvmConnection {
  provider: EvmProvider;
  chain: EvmChain | null;
  account: EvmAddress | null;
}

export interface EvmConnectionData<Connector extends AnyConnector = AnyConnector> extends EvmConnection {
  connector: Connector;
}
