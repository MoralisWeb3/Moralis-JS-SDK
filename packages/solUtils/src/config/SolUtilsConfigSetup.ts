import { Config } from '@moralisweb3/core';
import { SolUtilsConfig } from './SolUtilsConfig';

export class SolUtilsConfigSetup {
  public static register(config: Config) {
    config.registerKey(SolUtilsConfig.defaultSolNetwork);
  }
}
