import { ApiModule } from './ApiModule';
import { ModuleType } from './ModuleType';
import { Module } from './Module';

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
