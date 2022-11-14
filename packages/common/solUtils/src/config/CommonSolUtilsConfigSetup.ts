import { Config } from '@moralisweb3/common-core';
import { CommonSolUtilsConfig } from './CommonSolUtilsConfig';

export class CommonSolUtilsConfigSetup {
  public static register(config: Config) {
    config.registerKey(CommonSolUtilsConfig.defaultSolNetwork);
  }
}
