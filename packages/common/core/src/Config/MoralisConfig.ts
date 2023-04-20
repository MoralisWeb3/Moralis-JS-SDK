import { SolNetworkish } from './interfaces';
import { CoreConfig, EvmChainIdFormat } from './CoreConfig';
import { EvmChainish } from './interfaces/EvmChainish';

// @moralisweb3/common-core
type CoreConfigType = typeof CoreConfig;
export type CoreConfigValues = Omit<{ [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] }, 'product'>;

// @moralisweb3/common-evm-utils
export interface EvmUtilsConfigValues {
  formatEvmChainId: EvmChainIdFormat;
}

// @moralisweb3/evm-api
export interface EvmApiConfigValues {
  defaultEvmApiChain: EvmChainish;
}

// @moralisweb3/sol-api
export interface SolApiConfigValues {
  defaultSolNetwork: SolNetworkish;
}

export type MoralisCoreConfigValues =
  | CoreConfigValues
  | EvmUtilsConfigValues
  | EvmApiConfigValues
  | SolApiConfigValues
  // Other, not strong typed values.
  | { [key: string]: string | number };
