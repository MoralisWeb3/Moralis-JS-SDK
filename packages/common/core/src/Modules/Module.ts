import { Core } from '../Core';
import { LoggerController } from '../controllers/LoggerController';
import { ModuleType } from './ModuleType';

/**
 * The base class of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Module {
  protected readonly logger = LoggerController.create(this.name, this.core);

  public constructor(
    public readonly name: string,
    protected readonly core: Core,
    public readonly type: ModuleType = ModuleType.DEFAULT,
  ) {}

  public abstract setup(): void;

  /**
   * Start the module (if needed).
   * This function can be used to initialize variables etc.
   */
  public abstract start(): void | Promise<void>;

  /**
   * Any cleanup that needs to be done for removing this module.
   * It also should remove the module via `this.core.modules.remove(this.name)`
   */
  public cleanUp() {
    this.core.modules.remove(this.name);
  }
}

export interface ModuleFactory {
  create(core: Core): Module;
}
