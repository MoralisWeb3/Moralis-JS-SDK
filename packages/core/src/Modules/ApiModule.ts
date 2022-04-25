import { CoreModuleType } from './CoreModuleType';
import { BaseModule, BaseModuleConfig } from './BaseModule';

/**
 * Configuration for the creation of any Moralis Api module
 */
export interface ApiModuleConfig extends BaseModuleConfig {
  baseUrl: string;
}

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with a config object that provides the
 * - `name`: name of the module (should be unique)
 * - `core`: the MoralisCore instance
 * - `baseUrl`: the base url where of the api
 */
export abstract class ApiModule extends BaseModule {
  baseUrl: string;
  type: CoreModuleType.API;

  constructor({ name, baseUrl, core }: ApiModuleConfig) {
    super({ name, type: CoreModuleType.API, core });
    this.type = CoreModuleType.API;
    this.baseUrl = baseUrl;
  }
}
