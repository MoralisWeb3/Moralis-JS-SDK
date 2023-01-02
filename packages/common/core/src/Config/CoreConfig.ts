import { ConfigKey } from './Config';

export type LogLevel = 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'off';
export type BuildEnvironment = 'browser' | 'node' | 'react-native';
export type EvmAddressFormat = 'lowercase' | 'checksum';
export type EvmChainIdFormat = 'hex' | 'decimal';
export type EvmConnector = string;
export type Network = 'Evm' | 'Solana';

export const CoreConfig = {
  logLevel: {
    name: 'logLevel',
    defaultValue: 'info',
  } as ConfigKey<LogLevel>,

  buidEnvironment: {
    name: 'buidEnvironment',
    defaultValue: 'browser',
  } as ConfigKey<BuildEnvironment>,

  defaultNetwork: {
    name: 'defaultNetwork',
    defaultValue: 'Evm',
  } as ConfigKey<Network>,

  product: {
    name: 'product',
    defaultValue: undefined,
  } as ConfigKey<string | undefined>,

  /**
   * @description Maximal number of request retries.
   */
  maxRetries: {
    name: 'maxRetries',
    defaultValue: 2,
  } as ConfigKey<number>,
};
