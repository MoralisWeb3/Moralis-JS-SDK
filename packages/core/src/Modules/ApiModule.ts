import { CoreModuleType } from './CoreModuleType';
import { BaseModule, BaseModuleConfig } from './BaseModule';
import { EventMap } from 'typed-emitter';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ApiModule<Events extends EventMap = any> extends BaseModule<Events> {
  baseUrl: string;
  type: CoreModuleType.API;

  constructor({ name, baseUrl, core }: ApiModuleConfig) {
    super({ name, type: CoreModuleType.API, core });
    this.type = CoreModuleType.API;
    this.baseUrl = baseUrl;
  }
}
