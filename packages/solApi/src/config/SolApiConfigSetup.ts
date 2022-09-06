import { Config } from '@moralisweb3/core';
import { SolApiConfig } from './SolApiConfig';

export class SolApiConfigSetup {
  public static register(config: Config) {
    config.registerKey(SolApiConfig.defaultSolNetwork);
  }
}
