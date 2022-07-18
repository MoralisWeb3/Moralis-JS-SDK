import { EvmChainish } from '../dataTypes/EvmChainish';
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
  defaultEvmConnector: {
    name: 'defaultEvmConnector',
    defaultValue: 'metamask',
  } as ConfigKey<string>,
  defaultEvmApiChain: {
    name: 'defaultEvmApiChain',
    defaultValue: '0x1',
  } as ConfigKey<EvmChainish>,

  appId: {
    name: 'appId',
    defaultValue: null,
  } as ConfigKey<string | null>,
  serverUrl: {
    name: 'serverUrl',
    defaultValue: null,
  } as ConfigKey<string | null>,

  moralisSecret: {
    name: 'moralisSecret',
    defaultValue: null,
  } as ConfigKey<string | null>,
  masterKey: {
    name: 'masterKey',
    defaultValue: null,
  } as ConfigKey<string | null>,

  formatEvmChainId: {
    name: 'formatEvmChainId',
    defaultValue: 'hex',
  } as ConfigKey<EvmChainIdFormat>,
  formatEvmAddress: {
    name: 'formatEvmAddress',
    defaultValue: 'lowercase',
  } as ConfigKey<EvmAddressFormat>,
};
