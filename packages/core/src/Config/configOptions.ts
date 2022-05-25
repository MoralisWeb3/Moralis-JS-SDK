import { BaseModule } from '../Modules/BaseModule';
import { NetworkModule } from '../Modules/NetworkModule';
import { ModuleName } from '../Modules/ModuleName';

export type LogLevel = 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'off';
export type BuildEnvironment = 'browser' | 'node' | 'react-native';
export type EvmAddressFormat = 'lowercase' | 'checksum';
export type EvmChainIdFormat = 'hex' | 'decimal';
export type Network = 'Evm' | 'Solana';

export type EvmConnector = string;
export interface ConfigOption<T = unknown> {
  name: string;
  defaultValue: T;
  validation?: (value: T, config: ConfigValues, modules: BaseModule[]) => null | string;
}

const validateAppId = (value: string | null, config: ConfigValues, modules: BaseModule[]) => {
  const serverModule = modules.find((module) => module.name === ModuleName.SERVER);

  if (serverModule && !value) {
    return 'Value is required when using the MoralisServer. ';
  }

  return null;
};

const validateServerUrl = (value: string | null, config: ConfigValues, modules: BaseModule[]) => {
  const serverModule = modules.find((module) => module.name === ModuleName.SERVER);

  if (serverModule && !value) {
    return 'Value is required when using the MoralisServer. ';
  }

  return null;
};

const validateMoralisSecret = (value: string | null, config: ConfigValues) => {
  if (config.buidEnvironment !== 'node') {
    return 'Can only be set in a node "buildEnvironment" for security reasons.';
  }

  return null;
};

const validateMasterKey = (value: string | null, config: ConfigValues) => {
  if (config.buidEnvironment !== 'node') {
    return 'Can only be set in a node "buildEnvironment" for security reasons.';
  }
  return null;
};

const validateEvmConnector = (value: string, config: ConfigValues, modules: BaseModule[]) => {
  const evmModule = modules.find((module) => module.name === ModuleName.EVM);

  if (evmModule instanceof NetworkModule) {
    if (!evmModule.supportedConnectors.includes(value)) {
      return 'Invalid value. The connector is not registered as a connector to Evm. Make sure to register it via Evm.connectors.register(connector).';
    }
  }

  return null;
};

export const configOptions: {
  logLevel: ConfigOption<LogLevel>;
  buidEnvironment: ConfigOption<BuildEnvironment>;

  defaultNetwork: ConfigOption<Network>;
  defaultEvmConnector: ConfigOption<EvmConnector>;

  appId: ConfigOption<string | null>;
  serverUrl: ConfigOption<string | null>;
  moralisSecret: ConfigOption<string | null>;
  javascriptKey: ConfigOption<string | null>;
  masterKey: ConfigOption<string | null>;
  apiKey: ConfigOption<string | null>;

  formatEvmChainId: ConfigOption<EvmChainIdFormat>;
  formatEvmAddress: ConfigOption<EvmAddressFormat>;
} = {
  // The 'LogLevel', to indicate what kind of logs will be shown in the console
  logLevel: {
    name: 'logLevel',
    defaultValue: 'info',
  },
  // The build environment where this library is used
  buidEnvironment: {
    name: 'buildEnvironment',
    defaultValue: 'browser',
  },

  // The prefered default network to use, when nothing is specified
  defaultNetwork: {
    name: 'defaultNetwork',
    defaultValue: 'Evm',
  },
  // The default connector to use when connecting to Evm
  defaultEvmConnector: {
    name: 'defaultEvmConnector',
    defaultValue: 'metamask',
    validation: validateEvmConnector,
  },

  // The appId of the moralis server
  appId: {
    name: 'appId',
    defaultValue: null,
    validation: validateAppId,
  },
  // The serverUrl of the moralis server
  serverUrl: {
    name: 'serverUrl',
    defaultValue: null,
    validation: validateServerUrl,
  },
  // The moralisSecret of the user (should be kept secret, and only in backend environments)
  moralisSecret: {
    name: 'moralisSecret',
    defaultValue: null,
    validation: validateMoralisSecret,
  },
  // The javascriptKey of the moralis server
  javascriptKey: {
    name: 'javascriptKey',
    defaultValue: null,
  },
  // The javascriptKey of the moralis server (should be kept secret, and only in backend environments)
  masterKey: {
    name: 'masterKey',
    defaultValue: null,
    validation: validateMasterKey,
  },
  // The Moralis apikey
  apiKey: {
    name: 'apiKey',
    defaultValue: null,
  },

  // The prefered method on formatting Evm chainIds
  formatEvmChainId: {
    name: 'formatEvmChainId',
    defaultValue: 'hex',
  },
  // The prefered method on formatting Evm addresses
  formatEvmAddress: {
    name: 'formatEvmAddress',
    defaultValue: 'lowercase',
  },
};

export const defaultConfig: ConfigValues = {
  logLevel: configOptions.logLevel.defaultValue,
  buidEnvironment: configOptions.buidEnvironment.defaultValue,
  defaultNetwork: configOptions.defaultNetwork.defaultValue,
  defaultEvmConnector: configOptions.defaultEvmConnector.defaultValue,
  appId: configOptions.appId.defaultValue,
  serverUrl: configOptions.serverUrl.defaultValue,
  moralisSecret: configOptions.moralisSecret.defaultValue,
  javascriptKey: configOptions.javascriptKey.defaultValue,
  masterKey: configOptions.masterKey.defaultValue,
  apiKey: configOptions.apiKey.defaultValue,
  formatEvmChainId: configOptions.formatEvmChainId.defaultValue,
  formatEvmAddress: configOptions.formatEvmAddress.defaultValue,
};

export type ConfigOptions = typeof configOptions;
export type ConfigValues = { [Key in keyof ConfigOptions]: ConfigOptions[Key]['defaultValue'] };
