import { BaseModule } from './BaseModule';
import { NetworkModule } from './NetworkModule';
import { isApiModule, isNetworkModule } from './utils';
import { AnyBaseClass } from './types';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { ApiModule } from '..';

/**
 * Handles the mapping of all registered modules in Moralis
 * Any package that is used in Moralis, should register itself via this class.
 * This allows cross-communication between modules and easy management of the modules
 */
export class MoralisModules {
  private _modules = new Map<string, BaseModule>();

  /**
   * Register a new module based on a {@link BaseClass}
   */
  register = (moralisModule: AnyBaseClass) => {
    if (this._modules.has(moralisModule.name)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.DUPLICATE_MODULE,
        message: `The module ${moralisModule.name} has already been registered.`,
      });
    }

    this._modules.set(moralisModule.name, moralisModule);
  };

  /**
   * Returns the module with the given name.
   * This module should have been registered with `register`
   * Throws an error if no module with the given name has been registered.
   */
  get = (name: string): BaseModule => {
    const module = this._modules.get(name);

    if (!module) {
      throw new MoralisCoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }

    return module;
  };

  /**
   * Returns the network module with the provided name.
   * Throws an error if no network module with the given name has been registered
   */
  getNetwork = (name: string): NetworkModule => {
    const module = this.get(name);

    if (!isNetworkModule(module)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No NetworkModule found with the name "${name}"`,
      });
    }

    return module;
  };

  /**
   * Returns the network module with the provided name.
   * Throws an error if no network module with the given name has been registered
   */
  getApi = (name: string): ApiModule => {
    const module = this.get(name);

    if (!isApiModule(module)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No ApiModule found with the name "${name}"`,
      });
    }

    return module;
  };

  /**
   * Remove the module with the provided name, if it has been registered,
   * or throws an error if the module cannot be found.
   */
  remove = (name: string) => {
    const isRemoved = this._modules.delete(name);

    if (!isRemoved) {
      throw new MoralisCoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }
  };

  /**
   * List all the registered modules
   */
  list = () => {
    return Array.from(this._modules.values());
  };

  // TODO: make get names
  /**
   * Returns the names of all registered modules
   */
  listNames = () => {
    return this.list().map((module) => module.name);
  };

  /**
   * List all the registered network modules (eg. modules with the type CoreModuleType.NETWORK)
   */
  listNetworks = (): NetworkModule[] => {
    return Array.from(this._modules.values()).filter(isNetworkModule);
  };

  /**
   * List all the registered api modules (eg. modules with the type CoreModuleType.API)
   */
  listApis = (): ApiModule[] => {
    return Array.from(this._modules.values()).filter(isApiModule);
  };
}
