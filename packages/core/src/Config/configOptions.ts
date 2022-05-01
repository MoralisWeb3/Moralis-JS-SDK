export enum LogLevel {
  VERBOSE = 5,
  DEBUG = 4,
  INFO = 3,
  WARNING = 2,
  ERROR = 1,
  OFF = 0,
}

export type ConfigEnvironment = 'browser' | 'nodejs' | 'react-native';
export type ConfigAddressFormat = 'lowercase' | 'checksum';
export type ConfigChainIdFormat = 'hex' | 'decimal';
export type ConfigNetwork = 'evm' | 'sol';
export type ConfigEvmNetworkConnector = 'metamask' | 'walletconnect';

export interface MoralisConfigOptions {
  appId: string | null;
  serverUrl: string | null;
  apiKey: string | null;

  logLevel: LogLevel;

  formatAddress: ConfigAddressFormat;
  formatChainId: ConfigChainIdFormat;

  // defaultNetwork: ConfigNetwork;
  defaultEvmWallet: ConfigEvmNetworkConnector;
  environment: ConfigEnvironment;
  // TODO: move to other config, as this is not configurable by the user
  supportedEvmChainIds: number[];
}

export const supportedEvmChainIds = [1, 3, 4, 5, 42, 137, 80001, 56, 97, 43114, 43113, 250];

export const defaultConfig: MoralisConfigOptions = {
  appId: null,
  serverUrl: null,

  // TODO: replace apiKey for moralisSecret
  apiKey: null,

  // TODO: add plugins as option
  // TODO: add javascriptKey as option
  // TODO: add masterkey

  logLevel: LogLevel.INFO,

  formatChainId: 'hex',
  formatAddress: 'lowercase',

  // defaultNetwork: 'evm',
  defaultEvmWallet: 'metamask',
  environment: 'browser',
  supportedEvmChainIds,
};
