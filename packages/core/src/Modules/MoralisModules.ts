import { BaseClass } from '../BaseClass/BaseClass';
import { BaseNetworkClass } from '../BaseClass/BaseNetworkClass';
import { isBaseNetworkClass } from '../BaseClass/isBaseClass';
import { AnyBaseClass } from '../BaseClass/types';
import { CoreErrorCode, MoralisCoreError } from '../Error';

/**
 * Handles the mapping of all registered {@link  CoreModules} (created via {@link registerModule}).
 */
export class MoralisModules {
  private _modules = new Map<string, BaseClass>();

  constructor() {}

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
  get = (name: string): BaseClass => {
    const module = this._modules.get(name);

    if (!module) {
      throw new MoralisCoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }

    return module;
  };

  getNetwork = (name: string): BaseNetworkClass => {
    const module = this.get(name);

    if (!isBaseNetworkClass(module)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No NetworkModule found with the name "${name}"`,
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

  /**
   * Returns the names of all registered modules
   */
  listNames = () => {
    return this.list().map((module) => module.name);
  };

  /**
   * List all the registered network modules (eg. modules with the type CoreModuleType.NETWORK)
   */
  listNetworks = (): BaseClass[] => {
    return Array.from(this._modules.values()).filter(isBaseNetworkClass);
  };
}
