import EventEmitter from 'eventemitter3';
import { MoralisCore } from '..';
import { Logger } from '../controllers';
import { CoreModuleType } from '../Modules/CoreModuleType';

export interface BaseClassConfig {
  name: string;
  type?: CoreModuleType;
  core: MoralisCore;
}

/**
 * The base of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with a config object that provides the `name` and `type`.
 *
 * When creating an api, or network module, you should use the BaseApiClass or BaseNetworkClass
 */
export abstract class BaseClass extends EventEmitter {
  name: string;
  type: CoreModuleType;
  core: MoralisCore;
  logger: Logger;

  constructor({ name, type = CoreModuleType.DEFAULT, core }: BaseClassConfig) {
    super();
    this.name = name;
    this.type = type;
    this.core = core;
    this.logger = new Logger(core, this.name);

    this.listen = this.listen.bind(this);
  }

  /**
   * Start the module, if needed.
   * This function can be used to initialize variables etc
   */
  start(): void | Promise<void> {}

  cleanUp() {
    this.core.modules.remove(this.name);
  }

  /**
   * Listen to an event, and returns a cleanup function
   */
  listen<Args extends unknown>(eventName: string, listener: (args: Args) => void) {
    this.on(eventName, listener);
    return () => this.removeListener(eventName, listener);
  }
}
