import { Module } from './Module';
import { isApiModule } from './utils';
import { AnyBaseClass } from './types';
import { CoreErrorCode, CoreError } from '../Error';
import { ApiModule } from './ApiModule';

/**
 * MoralisModues handles all registered modules.
 * Any package that is used in Moralis, should register itself via this class.
 * This allows cross-communication between modules and easy management of the modules
 *
 * This class is responsible for:
 * - registering new modules
 * - removing modules (in theory possible for exotic usecases, but might break the app if done after initialisation)
 * - getting individual modules by name, type or everything
 */
export class Modules {
  private readonly modules = new Map<string, Module>();

  /**
   * Register and setup a new module by providing a module that is extended from BaseClass.
   * This will throw an error if the name is not unique
   * @param module the module that needs to be registered
   */
  public register(module: AnyBaseClass) {
    if (this.modules.has(module.name)) {
      throw new CoreError({
        code: CoreErrorCode.DUPLICATE_MODULE,
        message: `The module "${module.name}" has already been registered.`,
      });
    }

    this.modules.set(module.name, module);
    if (module.setup) {
      module.setup();
    }
  }

  /**
   * Returns the module with the given name.
   * This module should have been registered with `register`
   * @param name the module name
   * @returns a valid BaseModule
   * @throws a CoreError if no module with the given name has been registered
   */
  public get<CurrentModule extends Module = Module>(name: string): CurrentModule {
    const module = this.modules.get(name);
    if (!module) {
      throw new CoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }
    return module as CurrentModule;
  }

  /**
   * Tries to return the module with the given name if exist. Otherwise returns null.
   * @param name the module name
   * @returns a valid BaseModule or null
   */
  public tryGet(name: string): Module | null {
    return this.modules.get(name) || null;
  }

  public has(name: string): boolean {
    return this.modules.has(name);
  }

  /**
   * Returns the network module with the provided name.
   * @param name the module name
   * @returns a valid ApiModule
   * @throws a CoreError if no network module with the given name has been registered
   */
  public getApi(name: string): ApiModule {
    const module = this.modules.get(name);

    if (!module || !isApiModule(module)) {
      throw new CoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No ApiModule found with the name "${name}"`,
      });
    }

    return module;
  }

  /**
   * Remove the module with the provided name, if it has been registered,
   * @param name the module name
   * @throws a CoreError if the module cannot be found.
   */
  public remove(name: string) {
    const isRemoved = this.modules.delete(name);

    if (!isRemoved) {
      throw new CoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }
  }

  /**
   * List all the registered modules
   * @returns an array of BaseModule that have been registered
   */
  public list(): Module[] {
    return Array.from(this.modules.values());
  }

  /**
   * Returns the names of all registered modules
   */
  public listNames(): string[] {
    return this.list().map((module) => module.name);
  }

  /**
   * List all the registered api modules (eg. modules with the type CoreModuleType.API)
   */
  public listApis(): ApiModule[] {
    return this.list().filter(isApiModule);
  }
}
