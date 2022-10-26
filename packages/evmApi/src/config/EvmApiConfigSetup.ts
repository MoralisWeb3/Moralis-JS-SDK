import { Config } from '@moralisweb3/common-core';
import { EvmApiConfig } from './EvmApiConfig';

export class EvmApiConfigSetup {
  public static register(config: Config) {
    config.registerKey(EvmApiConfig.defaultEvmApiChain);
  }
}
