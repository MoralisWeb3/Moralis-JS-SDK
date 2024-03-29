import { SolNetworkish } from './interfaces';
import { CoreConfig } from './CoreConfig';
import { EvmChainish } from './interfaces/EvmChainish';

// @moralisweb3/common-core
type CoreConfigType = typeof CoreConfig;
export type CoreConfigValues = Omit<{ [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] }, 'product'>;

// @moralisweb3/common-evm-utils
export interface EvmUtilsConfigValues {
  defaultEvmApiChain: EvmChainish;
}

// @moralisweb3/evm-api
export interface EvmApiConfigValues {
  evmApiBaseUrl: string;
}

// @moralisweb3/sol-api
export interface SolApiConfigValues {
  defaultSolNetwork: SolNetworkish;
  solApiBaseUrl: string;
}

export type MoralisCoreConfigValues =
  | CoreConfigValues
  | EvmUtilsConfigValues
  | EvmApiConfigValues
  | SolApiConfigValues
  // Other, not strong typed values.
  | { [key: string]: string | number };
