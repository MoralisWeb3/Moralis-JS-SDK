import { Config } from '@moralisweb3/common-core';
import { SolApiConfig } from './SolApiConfig';

export class EvmSolApiConfigSetup {
  public static register(config: Config) {
    config.registerKey(SolApiConfig.solApiBaseUrl);
  }
}
