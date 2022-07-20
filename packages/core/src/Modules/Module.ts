import EventEmitter from 'eventemitter3';
import { MoralisCore } from '../MoralisCore';
import { LoggerController } from '../controllers/LoggerController';
import { ModuleType } from './ModuleType';
import TypedEmitter, { EventMap } from 'typed-emitter';

/**
 * The base class of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Module<Events extends EventMap = any> {
  protected readonly logger: LoggerController;
  protected readonly emitter = new EventEmitter<Events>() as unknown as TypedEmitter<Events>;

  public constructor(
    public readonly name: string,
    protected readonly core: MoralisCore,
    public readonly type: ModuleType = ModuleType.DEFAULT,
  ) {
    this.logger = new LoggerController(core.config, this.name);
  }

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

  /**
   * Listen to an event, and returns a cleanup function
   */
  public listen<Event extends keyof Events>(eventName: Event, listener: Events[Event]) {
    this.emitter.on(eventName, listener);
    return () => this.emitter.removeListener(eventName, listener);
  }
}

export interface ModuleFactory {
  create(core: MoralisCore): Module;
}
