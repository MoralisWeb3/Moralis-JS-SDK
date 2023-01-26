import { Config } from '@moralisweb3/common-core';
import { CommonAptosUtilsConfig } from './CommonAptosUtilsConfig';

export class CommonAptosUtilsConfigSetup {
  public static register(config: Config) {
    config.registerKey(CommonAptosUtilsConfig.defaultAptosNetwork);
  }
}
