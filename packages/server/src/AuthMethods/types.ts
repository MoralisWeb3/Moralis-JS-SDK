import {
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
  SolPhantomConnectorConnectOptions,
} from '@moralis/core';
import type Parse from 'parse';

/**
 * Possible auth methods for the user
 */
// TODO: convert to string, as it is easier to user by users
export enum AuthMethod {
  EVM = 'evm',
  SOL = 'sol',
  PASSWORD = 'password',
}

/**
 * Supported server auth adapters
 */
export enum AuthType {
  ETH = 'moralisEth',
  SOL = 'moralisSol',
}

export type AuthenticateData = { user: Parse.User };
export interface PasswordAuthOptions {
  password: string;
  username: string;
}

// TODO: combine this data type with the sharedType EvmConnect/SolConnect in /core
export type EvmAuthenticate = {
  (method: AuthMethod.EVM, wallet: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<AuthenticateData>;
  (
    method: AuthMethod.EVM,
    wallet: 'walletconnect',
    options?: EvmWalletConnectConnectorOptions,
  ): Promise<AuthenticateData>;
  // Fallback for custom connectors
  // (method: string, wallet: string, options?: EvmBaseConnectOptions): Promise<AuthenticateData>;
};

export type SolAuthenticate = {
  (method: AuthMethod.SOL, wallet: 'phantom', options?: SolPhantomConnectorConnectOptions): Promise<AuthenticateData>;
  // Fallback for custom connectors
  // (method: string, wallet: string, options?: SolBaseConnectOptions): Promise<AuthenticateData>;
};

export type PassAuthenticae = {
  (method: AuthMethod.PASSWORD, options?: PasswordAuthOptions): Promise<AuthenticateData>;
};

// TODO: make this into an overloaded function definition
// TODO: add fallback types, ot at least allow user to overwrite with their own custom connectors etc.
export type Authenticate = (method: AuthMethod, options?: Record<string, unknown>) => Promise<AuthenticateData>;
