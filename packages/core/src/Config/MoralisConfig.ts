import { CoreConfig } from './CoreConfig';

type CoreConfigType = typeof CoreConfig;

// @moralisweb3/api
interface ApiConfig {
  apiKey: string;
}

export type MoralisConfigValues =
  | { [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] }
  | ApiConfig
  | { [key: string]: string | number }; // Other, not strong typed values.
