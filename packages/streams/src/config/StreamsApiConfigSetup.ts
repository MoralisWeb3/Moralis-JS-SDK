import { Config } from '@moralisweb3/common-core';
import { StreamsConfig } from './StreamsConfig';

export class StreamsConfigSetup {
  public static register(config: Config) {
    config.registerKey(StreamsConfig.streamsSecret);
  }
}
