import { Core } from '../Core';
import { ModuleType } from './ModuleType';

/**
 * The base interface of every Moralis module that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `type`: (optional) CoreModuleType, defaults to CoreModuleType.DEFAULT
 *
 * When creating an api, or network module, you should use the ApiModule or NetworkModule
 */
export interface Module {
  name: string;
  type?: ModuleType;

  /**
   * Initializes the module.
   */
  setup?: () => void;
}

export interface ModuleFactory {
  create(core: Core): Module;
}
