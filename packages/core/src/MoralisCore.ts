import { BaseClass, BaseNetworkClass } from './BaseClass';
import { MoralisConfig, MoralisConfigOptions } from './MoralisConfig';
import { MoralisModules } from './Modules/MoralisModules';
import { Logger } from './controllers/LoggerController';

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
    modules: providedModules = [],
  }: {
    networks?: BaseNetworkClass[];
    modules?: BaseClass[];
  }) => {
    providedNetworks.forEach(this.modules.register);
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

    this.logger.verbose('Start called');

    await Promise.all(allModules.map((module) => module.start()));

    this.logger.verbose('Start finished');
  };
}

const moralisCore = new MoralisCore();
export default moralisCore;
