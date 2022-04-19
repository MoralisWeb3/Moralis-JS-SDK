/**
 * Type definitions that are used in multiple packages
 * // TODO: consider moving this to a separate types package
 */

import { EvmAddress, EvmChain } from '..';
import { InputChainId } from '../dataTypes/EvmChain';
import { EvmProvider } from './EvmProvider';

// Evm connections
export type EvmConnectorName = 'metamask' | 'walletConnect';
export type EvmBaseConnectOptions = Record<string, unknown>;

export interface EvmMetamaskConnectorConnectOptions extends EvmBaseConnectOptions {
  // Whether error messages should be logged to the console. Does not affect errors thrown due to invalid options
  silent?: boolean;
  // How many milliseconds to wait for asynchronously injected providers
  timeout?: number;
}

export interface EvmWalletConnectConnectorOptions extends EvmBaseConnectOptions {
  // Prefered chainId, if supported by the wallet
  chainId?: InputChainId;
  // List of mobile links
  mobileLinks?: string[];
  // Weather to reuse the same session (if available), or to force a new session
  newSession?: boolean;
}

export interface BaseConnectorOptions extends Record<string, unknown> {
  walletType?: EvmConnectorName;
  options?: unknown;
}
export interface EvmMetamaskConnectOptions extends BaseConnectorOptions {
  walletType: 'metamask';
  options?: EvmMetamaskConnectorConnectOptions;
}

export interface EvmWalletConnectConnectOptions extends BaseConnectorOptions {
  walletType: 'walletConnect';
  options?: EvmWalletConnectConnectorOptions;
}

export type EvmConnectOptions = EvmMetamaskConnectOptions | EvmWalletConnectConnectOptions;

export type AnyConnector = any;

export interface EvmConnectResponse {
  provider: EvmProvider;
  chain: EvmChain | null;
  account: EvmAddress | null;
}

export interface EvmConnectData<Connector extends AnyConnector = AnyConnector> extends EvmConnectResponse {
  connector: Connector;
}
