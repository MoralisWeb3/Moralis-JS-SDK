import { SolNetworkish } from '../dataTypes';
import { CoreConfig, EvmAddressFormat, EvmChainIdFormat } from './CoreConfig';
import { EvmChainish } from './interfaces/EvmChainish';

// @moralisweb3/core
type CoreConfigType = typeof CoreConfig;
type CoreConfigValues = { [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] };

// @moralisweb3/evm-utils
interface EvmUtilsConfigValues {
  formatEvmAddress: EvmAddressFormat;
  formatEvmChainId: EvmChainIdFormat;
}

// @moralisweb3/api
interface ApiConfigValues {
  apiKey: string;
}

// @moralisweb3/evm-api
interface EvmApiConfigValues {
  defaultEvmApiChain: EvmChainish;
}

// @moralisweb3/sol-api
interface SolApiConfigValues {
  defaultSolNetwork: SolNetworkish;
}

export type MoralisConfigValues =
  | CoreConfigValues
  | EvmUtilsConfigValues
  | ApiConfigValues
  | EvmApiConfigValues
  | SolApiConfigValues
  | { [key: string]: string | number }; // Other, not strong typed values.
