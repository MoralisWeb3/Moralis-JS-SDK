import {
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
  SolPhantomConnectorConnectOptions,
} from '@moralisweb3/core';
import type Parse from 'parse';

/**
 * Possible auth methods for the user
 */
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

export type Authenticate = (method: AuthMethod, options?: Record<string, unknown>) => Promise<AuthenticateData>;
