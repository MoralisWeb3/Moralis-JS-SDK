import { Modules } from '../Modules';
import { Config } from './Config';
import { CoreConfig } from './CoreConfig';
import { CoreConfigValidator } from './CoreConfigValidator';

export class CoreConfigSetup {
  public static register(config: Config, modules: Modules) {
    config.registerKey(CoreConfig.logLevel);
    config.registerKey(CoreConfig.buidEnvironment);

    config.registerKey(CoreConfig.defaultNetwork);
    config.registerKey(CoreConfig.defaultEvmConnector, (v) =>
      CoreConfigValidator.requireRegisteredEvmConnector(v, modules),
    );
    config.registerKey(CoreConfig.defaultEvmApiChain, (v) => CoreConfigValidator.requireValidChain(v));

    config.registerKey(CoreConfig.appId, () => CoreConfigValidator.requireServerModule(modules));
    config.registerKey(CoreConfig.serverUrl, () => CoreConfigValidator.requireServerModule(modules));
    config.registerKey(CoreConfig.moralisSecret, () => CoreConfigValidator.requireNodeBuidEnvironment(config));
    config.registerKey(CoreConfig.masterKey, () => CoreConfigValidator.requireNodeBuidEnvironment(config));

    config.registerKey(CoreConfig.formatEvmChainId);
    config.registerKey(CoreConfig.formatEvmAddress);
  }
}
