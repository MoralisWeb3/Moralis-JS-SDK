import EventEmitter from 'eventemitter3';
import { MoralisCore } from '..';
import { Logger } from '../controllers';
import { CoreModuleType } from './CoreModuleType';
import TypedEmitter, { EventMap } from 'typed-emitter';

/**
 * Configuration for the creation of any Moralis module
 */
export interface BaseModuleConfig {
  name: string;
  type?: CoreModuleType;
  core: MoralisCore;
}

/**
 * The base class of every Moralis class that gets registered as a module via MoralisModules
 * It should always be created with a config object that provides the
 * - `name`: name of the module (should be unique)
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 * - `core`: the MoralisCore instance
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
export abstract class BaseModule<Events extends EventMap = any> {
  name: string;
  type: CoreModuleType;
  core: MoralisCore;
  logger: Logger;
  emitter = new EventEmitter() as unknown as TypedEmitter<Events>;

  constructor({ name, type = CoreModuleType.DEFAULT, core }: BaseModuleConfig) {
    this.name = name;
    this.type = type;
    this.core = core;
    this.logger = new Logger(core, this.name);

    // this.listen = this.listen.bind(this);
  }

  /**
   * Start the module (if needed).
   * This function can be used to initialize variables etc.
   */
  start(): void | Promise<void> {}

  /**
   * Any cleanup that needs to be done for removing this module.
   * It also should remove the module via `this.core.modules.remove(this.name)`
   */
  cleanUp() {
    this.core.modules.remove(this.name);
  }

  /**
   * Listen to an event, and returns a cleanup function
   */
  listen<Event extends keyof Events>(eventName: Event, listener: Events[Event]) {
    this.on(eventName, listener);
    return () => this.removeListener(eventName, listener);
  }

  on = this.emitter.on;
  off = this.emitter.off;
  once = this.emitter.once;
  emit = this.emitter.emit;
  listeners = this.emitter.listeners;
  listenerCount = this.emitter.listenerCount;
  addListener = this.emitter.addListener;
  removeListener = this.emitter.removeListener;
  removeAllListeners = this.emitter.removeAllListeners;
  eventNames = this.emitter.eventNames;
}
