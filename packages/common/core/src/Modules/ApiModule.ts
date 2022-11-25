import { ModuleType } from './ModuleType';
import { Module } from './Module';

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `baseUrl`: the base url where of the api
 */
export interface ApiModule extends Module {
  type: ModuleType.API;
  baseUrl: string;
}
