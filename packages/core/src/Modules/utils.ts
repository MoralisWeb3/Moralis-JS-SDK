import { ApiModule } from './ApiModule';
import { ModuleType } from './ModuleType';
import { Module } from './Module';
import { NetworkModule } from './NetworkModule';

/**
 * Verify if the provided class is a network type.
 * Should be used as a Typescript type-guard
 *
 * @example
 * ```
 * if(isBaseNetwork(module)){
 *  // module is types as NetworkModule here
 * }
 * ```
 */
export const isNetworkModule = (moralisClass: Module): moralisClass is NetworkModule => {
  if (moralisClass.type === ModuleType.NETWORK) {
    return true;
  }

  return false;
};

/**
 * Verify if the provided class is a api type.
 * Should be used as a Typescript type-guard
 *
 * @example
 * ```
 * if(isApiModule(module)){
 *  // module is types as ApiModule here
 * }
 * ```
 */
export const isApiModule = (moralisClass: Module): moralisClass is ApiModule => {
  if (moralisClass.type === ModuleType.API) {
    return true;
  }

  return false;
};
