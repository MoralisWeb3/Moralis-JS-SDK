import { Module, ModuleFactory } from './Modules/Module';
import { Modules } from './Modules/Modules';
import { LoggerController } from './controllers/LoggerController';
import { Config } from './Config/Config';
import { CoreConfigSetup } from './Config/CoreConfigSetup';
import { MoralisConfigValues } from './Config';
import { LIB_VERSION } from './version';

/**
 * MoralisCore is used in all Moralis applications
 * This class is **required** to be implemented in every app
 *
 * This class is responsible for:
 * - registering, removing and accessing modules
 * - accessing and changing the config
 */
export class MoralisCore {
  public static readonly moduleName = 'core';

  public static create(): MoralisCore {
    const modules = new Modules();
    const config = new Config();
    const logger = new LoggerController(MoralisCore.moduleName, config);
    const core = new MoralisCore(modules, config, logger);
    CoreConfigSetup.register(config);
    return core;
  }

  public readonly name = MoralisCore.moduleName;

  public static readonly libVersion = LIB_VERSION;

  public constructor(
    public readonly modules: Modules,
    public readonly config: Config,
    public readonly logger: LoggerController,
  ) {}

  /**
   * Register all specified modules and configurations
   * @params array of all modules (any module that is extended from BaseModule) that you want to include
   */
  public registerModules = (modules: (Module | ModuleFactory)[]) => {
    modules.forEach(this.registerModule);
  };

  /**
   * Register a new module
   */
  public registerModule = (module: Module | ModuleFactory) => {
    if ('create' in module) {
      module = module.create(this);
    }
    this.modules.register(module);

    this.logger.verbose('Module registered', { module: module.name });
  };

  public getModule = <CurrentModule extends Module = Module>(name: string): CurrentModule => {
    return this.modules.get<CurrentModule>(name);
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
