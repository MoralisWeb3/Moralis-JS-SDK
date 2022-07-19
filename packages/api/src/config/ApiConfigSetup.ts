import { Config } from '@moralisweb3/core';
import { ApiConfig } from './ApiConfig';

export class ApiConfigSetup {
  public static register(config: Config) {
    config.registerKey(ApiConfig.apiKey);
  }
}
