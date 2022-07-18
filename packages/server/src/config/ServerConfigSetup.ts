import { Config } from '@moralisweb3/core';
import { ServerConfig } from './ServerConfig';

export class ServerConfigSetup {
  public static register(config: Config) {
    config.registerKey(ServerConfig.authenticationMessage);
  }
}
