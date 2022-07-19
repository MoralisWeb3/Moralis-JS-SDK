import { CoreConfig } from './CoreConfig';

type CoreConfigType = typeof CoreConfig;

// @moralisweb3/evm-api
interface EvmApiConfig {
  apiKey: string;
}

export type MoralisConfigValues =
  | { [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] }
  | EvmApiConfig
  | { [key: string]: string | number }; // Other, not strong typed values.
