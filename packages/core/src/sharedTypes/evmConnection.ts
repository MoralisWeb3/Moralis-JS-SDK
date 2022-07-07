/**
 * Type definitions that are used in multiple packages
 */

import { EvmAddress } from '../dataTypes/EvmAddress';
import { InputChainId, EvmChain } from '../dataTypes/EvmChain';
import { EvmProvider } from './EvmProvider';

// Evm connections
export type EvmBaseConnectOptions = Record<string, unknown>;
export type SolBaseConnectOptions = Record<string, unknown>;

export type EvmConnect = {
  (connector: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<EvmConnectionData>;
  (connector: 'walletconnect', options?: EvmWalletConnectConnectorOptions): Promise<EvmConnectionData>;
  (connector: 'web3auth', options?: EvmWeb3authConnectOptions): Promise<EvmConnectionData>;
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

export interface EvmWeb3authConnectOptions extends EvmBaseConnectOptions {
  // user client id
  clientId: string;
  // App logo to display
  appLogo?: string;
  // The list of login methods
  loginMethodsOrder?: string[];
  // Web3auth theme to use
  theme?: 'light' | 'dark';
  // Prefered chainId, if supported by the connector
  chainId?: InputChainId;
  // Whether to reuse the same session (if available), or to force a new session
  newSession?: boolean;
}

const CHAIN_NAMESPACES = {
  EIP155: 'eip155',
} as const;
// eip155 for all evm chains
export type ChainNamespaceType = typeof CHAIN_NAMESPACES[keyof typeof CHAIN_NAMESPACES];

export interface EvmWalletConnectConnectorOptions extends EvmBaseConnectOptions {
  // Prefered chainId, if supported by the connector
  chainId?: InputChainId;
  // List of mobile links
  mobileLinks?: string[];
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
