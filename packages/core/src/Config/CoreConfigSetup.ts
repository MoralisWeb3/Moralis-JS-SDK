import { MoralisCore } from '../MoralisCore';
import { Config } from './Config';
import { CoreConfig } from './CoreConfig';
import { CoreConfigValidator } from './CoreConfigValidator';

export class CoreConfigSetup {
  public static register(config: Config, core: MoralisCore) {
    config.registerKey(CoreConfig.logLevel);
    config.registerKey(CoreConfig.buidEnvironment);

    config.registerKey(CoreConfig.defaultNetwork, (v) =>
      CoreConfigValidator.requireRegisteredConnector(v, core.modules),
    );
    config.registerKey(CoreConfig.defaultEvmConnector);
    config.registerKey(CoreConfig.defaultEvmApiChain, (v) => CoreConfigValidator.requireValidChain(v, core));

    config.registerKey(CoreConfig.appId, () => CoreConfigValidator.requireServerModule(core.modules));
    config.registerKey(CoreConfig.serverUrl, () => CoreConfigValidator.requireServerModule(core.modules));
    config.registerKey(CoreConfig.moralisSecret, () => CoreConfigValidator.requireNodeBuidEnvironment(core.config));
    config.registerKey(CoreConfig.javascriptKey);
    config.registerKey(CoreConfig.masterKey, () => CoreConfigValidator.requireNodeBuidEnvironment(core.config));

    config.registerKey(CoreConfig.formatEvmChainId);
    config.registerKey(CoreConfig.formatEvmAddress);
  }
}
