import { Config } from '@moralisweb3/core';
import { EvmUtilsConfig } from './EvmUtilsConfig';

export class EvmUtilsConfigSetup {
  public static register(config: Config) {
    config.registerKey(EvmUtilsConfig.formatEvmAddress);
    config.registerKey(EvmUtilsConfig.formatEvmChainId);
  }
}
