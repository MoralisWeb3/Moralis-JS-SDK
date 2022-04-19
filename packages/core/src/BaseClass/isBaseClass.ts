import { CoreModuleType } from '../Modules';
import { BaseClass } from './BaseClass';
import { BaseNetworkClass } from './BaseNetworkClass';

/**
 * Verify if the provided class is a network type.
 * Should be used as a Typescript type-guard
 *
 * @example
 * ```
 * if(isBaseNetwork(module)){
 *  // module is types as BaseNetworkClass here
 * }
 * ```
 */
export const isBaseNetworkClass = (moralisClass: BaseClass): moralisClass is BaseNetworkClass => {
  if (moralisClass.type === CoreModuleType.NETWORK) {
    return true;
  }

  return false;
};
