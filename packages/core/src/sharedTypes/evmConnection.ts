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
  (connector: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<EvmConnectData>;
  (connector: 'walletconnect', options?: EvmWalletConnectConnectorOptions): Promise<EvmConnectData>;
  (connector: string, options?: EvmBaseConnectOptions): Promise<EvmConnectData>;
};

export type SolConnect = {
  (connector: 'phantom', options?: SolPhantomConnectorConnectOptions): Promise<EvmConnectData>;
  (connector: string, options?: EvmBaseConnectOptions): Promise<EvmConnectData>;
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
  chainConfig?: CustomChainConfig;
}

const CHAIN_NAMESPACES = {
  EIP155: 'eip155',
  SOLANA: 'solana',
} as const;
// eip155 for all evm chains
export type ChainNamespaceType = typeof CHAIN_NAMESPACES[keyof typeof CHAIN_NAMESPACES];

interface CustomChainConfig {
  chainNamespace: ChainNamespaceType;
  /*
   RPC target Url for the chain
  */
  rpcTarget?: string;
  /*
   Display Name for the chain
  */
  displayName?: string;
  /*
   Url of the block explorer
   */
  blockExplorer?: string;
  /*
   Default currency ticker of the network (e.g: ETH)
  */
  ticker?: string;
  /*
   Name for currency ticker (e.g: `Ethereum`)
  */
  tickerName?: string;
}

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

export interface EvmConnectResponse {
  provider: EvmProvider;
  chain: EvmChain | null;
  account: EvmAddress | null;
}

export interface EvmConnectData<Connector extends AnyConnector = AnyConnector> extends EvmConnectResponse {
  connector: Connector;
}
