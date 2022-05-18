import { EvmProviderEvent } from './EvmProviderEvents';

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  type: string;
  data: unknown;
}

export interface ProviderInfo {
  chainId: string;
}

export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

export type ProviderChainId = string;

export type ProviderAccounts = string[];

export interface EIP1102Request extends RequestArguments {
  method: 'eth_requestAccounts';
}

export interface SimpleEventEmitter {
  // add listener
  on(event: string, listener: (args: unknown) => void): void;
  // add one-time listener
  once(event: string, listener: (args: unknown) => void): void;
  // remove listener
  removeListener(event: string, listener: (args: unknown) => void): void;
  // removeListener alias
  off(event: string, listener: (args: unknown) => void): void;
}

export interface EIP1193Provider extends SimpleEventEmitter {
  // connection event
  on(event: EvmProviderEvent.CONNECT, listener: (info: ProviderInfo) => void): void;
  // disconnection event
  on(event: EvmProviderEvent.DISCONNECT, listener: (error: ProviderRpcError) => void): void;
  // arbitrary messages
  on(event: EvmProviderEvent.MESSAGE, listener: (message: ProviderMessage) => void): void;
  // chain changed event
  on(event: EvmProviderEvent.CHAIN_CHANGED, listener: (chainId: ProviderChainId) => void): void;
  // accounts changed event
  on(event: EvmProviderEvent.ACCOUNTS_CHANGED, listener: (accounts: ProviderAccounts) => void): void;
  // make an Ethereum RPC method call.
  request(args: RequestArguments): Promise<unknown>;
}

export interface EvmProvider extends EIP1193Provider {
  // legacy alias for EIP-1102
  enable(): Promise<ProviderAccounts>;
}
