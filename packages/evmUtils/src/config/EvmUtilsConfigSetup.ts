import { Config } from '@moralisweb3/core';
import { EvmUtilsConfig } from './EvmUtilsConfig';

export class EvmUtilsConfigSetup {
  public static register(config: Config) {
    if (!config.hasKey(EvmUtilsConfig.formatEvmAddress)) {
      config.registerKey(EvmUtilsConfig.formatEvmAddress);
    }

    if (!config.hasKey(EvmUtilsConfig.formatEvmChainId)) {
      config.registerKey(EvmUtilsConfig.formatEvmChainId);
    }
  }
}
