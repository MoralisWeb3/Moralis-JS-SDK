import { ModuleType } from './ModuleType';
import { Module } from './Module';
import { EventMap } from 'typed-emitter';
import { MoralisCore } from '../MoralisCore';

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 * - `baseUrl`: the base url where of the api
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ApiModule<Events extends EventMap = any> extends Module<Events> {
  public constructor(name: string, core: MoralisCore, public readonly baseUrl: string) {
    super(name, core, ModuleType.API);
  }
}
