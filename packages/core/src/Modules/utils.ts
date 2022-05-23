import { ApiModule } from './ApiModule';
import { CoreModuleType } from './CoreModuleType';
import { BaseModule } from './BaseModule';
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
export const isNetworkModule = (moralisClass: BaseModule): moralisClass is NetworkModule => {
  if (moralisClass.type === CoreModuleType.NETWORK) {
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
export const isApiModule = (moralisClass: BaseModule): moralisClass is ApiModule => {
  if (moralisClass.type === CoreModuleType.API) {
    return true;
  }

  return false;
};
