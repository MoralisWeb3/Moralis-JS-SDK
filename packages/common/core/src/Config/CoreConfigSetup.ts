import { Config } from './Config';
import { CoreConfig } from './CoreConfig';

export class CoreConfigSetup {
  public static register(config: Config) {
    config.registerKey(CoreConfig.logLevel);
    config.registerKey(CoreConfig.buidEnvironment);

    config.registerKey(CoreConfig.defaultNetwork);
    config.registerKey(CoreConfig.product);
    config.registerKey(CoreConfig.maxRetries);
  }
}
