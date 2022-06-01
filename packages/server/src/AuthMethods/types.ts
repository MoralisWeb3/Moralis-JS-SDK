import {
  EvmMetamaskConnectorConnectOptions,
  EvmWalletConnectConnectorOptions,
  SolPhantomConnectorConnectOptions,
} from '@moralisweb3/core';
import { UserDataValue } from '../utils/setUserData';
import type Parse from 'parse';

/**
 * Possible auth methods for the user
 */
export enum AuthMethod {
  EVM = 'evm',
  SOL = 'sol',
  SIGN_UP = 'signUp',
  SIGN_IN = 'SignIn',
}

/**
 * Supported server auth adapters
 */
export enum AuthType {
  ETH = 'moralisEth',
  SOL = 'moralisSol',
}

export type AuthenticateData = { user: Parse.User };
export interface SignUpAuthOptions {
  password: string;
  username: string;
  email?: string;
  fields?: Record<string, UserDataValue>;
}

export interface SignInAuthOptions {
  password: string;
  username: string;
}

export type EvmAuthenticate = {
  (method: AuthMethod.EVM, wallet: 'metamask', options?: EvmMetamaskConnectorConnectOptions): Promise<AuthenticateData>;
  (
    method: AuthMethod.EVM,
    connector: 'walletconnect',
    options?: EvmWalletConnectConnectorOptions,
  ): Promise<AuthenticateData>;
  // Fallback for custom connectors
  // (method: string, wallet: string, options?: EvmBaseConnectOptions): Promise<AuthenticateData>;
};

export type SolAuthenticate = {
  (
    method: AuthMethod.SOL,
    connector: 'phantom',
    options?: SolPhantomConnectorConnectOptions,
  ): Promise<AuthenticateData>;
  // Fallback for custom connectors
  // (method: string, wallet: string, options?: SolBaseConnectOptions): Promise<AuthenticateData>;
};

export type SignUpAuthenticate = {
  (method: AuthMethod.SIGN_UP, options?: SignUpAuthOptions): Promise<AuthenticateData>;
};

export type SignInAuthenticate = {
  (method: AuthMethod.SIGN_IN, options?: SignInAuthOptions): Promise<AuthenticateData>;
};

export type Authenticate = (method: AuthMethod, options?: Record<string, unknown>) => Promise<AuthenticateData>;
