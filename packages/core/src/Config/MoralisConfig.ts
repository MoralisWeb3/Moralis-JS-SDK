import { CoreConfig } from './CoreConfig';

type CoreConfigType = typeof CoreConfig;

// @moralisweb3/api-utils
interface ApiConfig {
  apiKey: string;
}

// @moralisweb3/server
interface ServerConfig {
  authenticationMessage: string;
}

export type MoralisConfigValues =
  | { [Key in keyof CoreConfigType]: CoreConfigType[Key]['defaultValue'] }
  | ApiConfig
  | ServerConfig
  | { [key: string]: string | number }; // Other, not strong typed values.
