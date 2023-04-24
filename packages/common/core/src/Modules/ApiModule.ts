import { ModuleType } from './ModuleType';
import { Module } from './Module';
import { Core } from '../Core';

/**
 * The base class of every Moralis Api class that gets registered as a module via MoralisModules
 * It should always be created with:
 * - `name`: name of the module (should be unique)
 * - `core`: the Core instance
 * - `baseUrlProvider`: the provider of the base URL.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class ApiModule extends Module {
  private _baseUrl?: string;

  /**
   * @description The base URL of the API.
   */
  public get baseUrl(): string {
    if (!this._baseUrl) {
      this._baseUrl = this.baseUrlProvider();
    }
    return this._baseUrl;
  }

  public constructor(name: string, core: Core, private readonly baseUrlProvider: () => string) {
    super(name, core, ModuleType.API);
  }
}
