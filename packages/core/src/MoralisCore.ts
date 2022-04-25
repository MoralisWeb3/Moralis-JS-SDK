import { BaseModule } from './Modules/BaseModule';
import { NetworkModule } from './Modules/NetworkModule';
import { ApiModule } from './Modules/ApiModule';
import { MoralisConfig, MoralisConfigOptions } from './Config';
import { MoralisModules } from './Modules/MoralisModules';
import { Logger } from './controllers/LoggerController';

/**
 * MoralisCore class that is used in all Moralis applications
 * It's responsible for:
 * - registering and accessing modules
 * - accessing and changing the config
 */
export class MoralisCore {
  name = 'core';
  modules: MoralisModules;
  config: MoralisConfig;
  logger: Logger;

  constructor() {
    this.modules = new MoralisModules();
    this.config = new MoralisConfig();
    this.logger = new Logger(this, this.name);
  }

  /**
   * Initialize all specified modules and configurations
   */
  registerModules = ({
    networks: providedNetworks = [],
    apis: providedApis = [],
    modules: providedModules = [],
  }: {
    networks?: NetworkModule[];
    apis?: ApiModule[];
    modules?: BaseModule[];
  }) => {
    providedNetworks.forEach(this.modules.register);
    providedApis.forEach(this.modules.register);
    providedModules.forEach(this.modules.register);

    this.logger.verbose('Modules initialized', { allModules: this.modules.listNames() });
  };

  /**
   * Start all modules, this function should be called before any interaction with a module,
   * as it is responsible for initialising the modules
   */
  start = async (providedConfig?: Partial<MoralisConfigOptions>) => {
    if (providedConfig) {
      this.config.merge(providedConfig);
    }
    const allModules = this.modules.list();

    this.logger.verbose('Starting all registered modules', {
      moduleNames: this.modules.listNames(),
    });

    await Promise.all(allModules.map((module) => module.start()));

    this.logger.verbose('Finished starting all registered modules', {
      moduleNames: this.modules.listNames(),
    });
  };
}

const moralisCore = new MoralisCore();
export default moralisCore;
