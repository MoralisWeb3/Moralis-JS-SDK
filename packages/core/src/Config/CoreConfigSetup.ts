import { Modules } from '../Modules';
import { Config } from './Config';
import { CoreConfig } from './CoreConfig';
import { CoreConfigValidator } from './CoreConfigValidator';

export class CoreConfigSetup {
  public static register(config: Config, modules: Modules) {
    config.registerKey(CoreConfig.logLevel);
    config.registerKey(CoreConfig.buidEnvironment);

    config.registerKey(CoreConfig.defaultNetwork);
    config.registerKey(CoreConfig.defaultEvmApiChain, (v) => CoreConfigValidator.requireValidChain(v));

    config.registerKey(CoreConfig.formatEvmChainId);
    config.registerKey(CoreConfig.formatEvmAddress);
  }
}
