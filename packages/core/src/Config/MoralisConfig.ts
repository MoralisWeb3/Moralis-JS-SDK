import { SolNetworkish } from '../dataTypes';
import { CoreConfig } from './CoreConfig';

// @moralisweb3/core
type CoreConfigType = typeof CoreConfig;
type CoreConfigValues = { [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] };

// @moralisweb3/api
interface ApiConfigValues {
  apiKey: string;
}

// @moralisweb3/sol-api
interface SolApiConfigValues {
  defaultSolNetwork: SolNetworkish;
}

export type MoralisConfigValues =
  | CoreConfigValues
  | ApiConfigValues
  | SolApiConfigValues
  | { [key: string]: string | number }; // Other, not strong typed values.
