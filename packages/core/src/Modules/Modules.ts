import { Module } from './Module';
import { NetworkModule } from './NetworkModule';
import { isApiModule, isNetworkModule } from './utils';
import { AnyBaseClass } from './types';
import { CoreErrorCode, MoralisCoreError } from '../Error';
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
   * Register a new module by providing a module that is extended from BaseClass.
   * This will throw an error if the name is not unique
   * @param module the module that needs to be registered
   */
  public register(module: AnyBaseClass) {
    if (this.modules.has(module.name)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.DUPLICATE_MODULE,
        message: `The module "${module.name}" has already been registered.`,
      });
    }

    this.modules.set(module.name, module);
    module.setup();
  }

  /**
   * Returns the module with the given name.
   * This module should have been registered with `register`
   * @param name the module name
   * @returns a valid BaseModule
   * @throws a MoralisCoreError if no module with the given name has been registered
   */
  public get<M extends Module = Module>(name: string): M {
    const module = this.modules.get(name);
    if (!module) {
      throw new MoralisCoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
    }
    return module as M;
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

  public tryGetNetwork(name: string): NetworkModule | null {
    const module = this.modules.get(name);
    return module && isNetworkModule(module) ? module : null;
  }

  /**
   * Returns the network module with the provided name.
   * @param name the module name
   * @returns a valid NetworkModule
   * @throws a MoralisCoreError if no network module with the given name has been registered
   */
  public getNetwork(name: string): NetworkModule {
    const module = this.tryGetNetwork(name);

    if (!module) {
      throw new MoralisCoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No NetworkModule found with the name "${name}"`,
      });
    }

    return module;
  }

  /**
   * Returns the network module with the provided name.
   * @param name the module name
   * @returns a valid ApiModule
   * @throws a MoralisCoreError if no network module with the given name has been registered
   */
  public getApi(name: string): ApiModule {
    const module = this.modules.get(name);

    if (!module || !isApiModule(module)) {
      throw new MoralisCoreError({
        code: CoreErrorCode.MODULE_NOT_FOUND,
        message: `No ApiModule found with the name "${name}"`,
      });
    }

    return module;
  }

  /**
   * Remove the module with the provided name, if it has been registered,
   * @param name the module name
   * @throws a MoralisCoreError if the module cannot be found.
   */
  public remove(name: string) {
    const isRemoved = this.modules.delete(name);

    if (!isRemoved) {
      throw new MoralisCoreError({ code: CoreErrorCode.MODULE_NOT_FOUND, message: `Module "${name}" does not exist.` });
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
   * List all the registered network modules (eg. modules with the type CoreModuleType.NETWORK)
   */
  public listNetworks(): NetworkModule[] {
    return this.list().filter(isNetworkModule);
  }

  /**
   * List all the registered api modules (eg. modules with the type CoreModuleType.API)
   */
  public listApis(): ApiModule[] {
    return this.list().filter(isApiModule);
  }
}
