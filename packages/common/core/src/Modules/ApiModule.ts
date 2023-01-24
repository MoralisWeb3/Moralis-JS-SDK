import { ModuleType } from './ModuleType';
import { Module } from './Module';
import { Core } from '../Core';

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `baseUrl`: the base url where of the api
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ApiModule extends Module {
  public constructor(name: string, core: Core, public readonly baseUrl: string) {
    super(name, core, ModuleType.API);
  }
}
