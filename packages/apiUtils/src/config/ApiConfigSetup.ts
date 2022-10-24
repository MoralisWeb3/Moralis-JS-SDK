import { Config } from '@moralisweb3/core';
import { ApiConfig } from './ApiConfig';

export class ApiConfigSetup {
  public static register(config: Config) {
    if (!config.hasKey(ApiConfig.apiKey)) {
      config.registerKey(ApiConfig.apiKey);
    }
    if (!config.hasKey(ApiConfig.sdkIntegration)) {
      config.registerKey(ApiConfig.sdkIntegration);
    }
  }
}
