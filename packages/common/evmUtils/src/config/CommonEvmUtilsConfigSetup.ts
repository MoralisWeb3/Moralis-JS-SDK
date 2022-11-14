import { Config } from '@moralisweb3/common-core';
import { CommonEvmUtilsConfig } from './CommonEvmUtilsConfig';

export class CommonEvmUtilsConfigSetup {
  public static register(config: Config) {
    config.registerKey(CommonEvmUtilsConfig.formatEvmAddress);
    config.registerKey(CommonEvmUtilsConfig.formatEvmChainId);
  }
}
