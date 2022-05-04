import { BaseModule } from './Modules/BaseModule';
import { MoralisConfig, ConfigValues } from './Config';
import { MoralisModules } from './Modules/MoralisModules';
import { Logger } from './controllers/LoggerController';

/**
 * MoralisCore is used in all Moralis applications
 * This class is **required** to be implemented in every app
 *
 * This class is responsible for:
 * - registering, removing and accessing modules
 * - accessing and changing the config
 */
export class MoralisCore {
  name = 'core';
  modules: MoralisModules;
  config: MoralisConfig;
  logger: Logger;

  constructor() {
    this.modules = new MoralisModules();
    this.config = new MoralisConfig(this.modules);
    this.logger = new Logger(this, this.name);
  }

  /**
   * Register all specified modules and configurations
   * @params array of all modules (any module that is extended from BaseModule) that you want to include
   */
  registerModules = (modules: BaseModule[]) => {
    modules.forEach(this.modules.register);

    this.logger.verbose('Modules registered', { allModules: this.modules.listNames() });
  };

  /**
   * Register a new module
   */
  registerModule = (module: BaseModule) => {
    this.modules.register(module);

    this.logger.verbose('Module registered', { module: module.name });
  };

  /**
   * Start all modules, this function should be called before any interaction with a module,
   * as it is responsible for initialising the modules.
   *
   * This will call `start()` on every registered module
   */
  start = async (providedConfig?: Partial<ConfigValues>) => {
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
