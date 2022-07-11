import { BaseModule } from './Modules/BaseModule';
import { MoralisModules } from './Modules/MoralisModules';
import { LoggerController } from './controllers/LoggerController';
import { Config } from './config/Config';
import { MoralisConfigValues } from './config/MoralisConfig';
import { CoreConfigSetup } from './config/CoreConfigSetup';

/**
 * MoralisCore is used in all Moralis applications
 * This class is **required** to be implemented in every app
 *
 * This class is responsible for:
 * - registering, removing and accessing modules
 * - accessing and changing the config
 */
export class MoralisCore {
  public static create(): MoralisCore {
    const modules = new MoralisModules();
    const config = new Config();
    const logger = new LoggerController(config, 'core');
    const core = new MoralisCore(modules, config, logger);
    CoreConfigSetup.register(config, core);
    return core;
  }

  public constructor(
    public readonly modules: MoralisModules,
    public readonly config: Config,
    public readonly logger: LoggerController,
  ) {}

  /**
   * Register all specified modules and configurations
   * @params array of all modules (any module that is extended from BaseModule) that you want to include
   */
  public registerModules = (modules: BaseModule[]) => {
    modules.forEach((module) => {
      this.modules.register(module);
    });

    this.logger.verbose('Modules registered', { allModules: this.modules.listNames() });
  };

  /**
   * Register a new module
   */
  public registerModule = (module: BaseModule) => {
    this.modules.register(module);

    this.logger.verbose('Module registered', { module: module.name });
  };

  /**
   * Start all modules, this function should be called before any interaction with a module,
   * as it is responsible for initialising the modules.
   *
   * This will call `start()` on every registered module
   */
  public start = async (providedConfig?: Partial<MoralisConfigValues>) => {
    const allModules = this.modules.list();

    if (providedConfig) {
      this.config.merge(providedConfig);
    }

    this.logger.verbose('Starting all registered modules', {
      moduleNames: this.modules.listNames(),
    });

    await Promise.all(allModules.map((module) => module.start()));

    this.logger.verbose('Finished starting all registered modules', {
      moduleNames: this.modules.listNames(),
    });
  };
}
