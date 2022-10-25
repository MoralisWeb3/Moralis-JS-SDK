import { Config } from '@moralisweb3/core';
import { ApiUtilsConfig } from './ApiUtilsConfig';

export class ApiUtilsConfigSetup {
  public static register(config: Config) {
    if (!config.hasKey(ApiUtilsConfig.apiKey)) {
      config.registerKey(ApiUtilsConfig.apiKey);
    }
  }
}
