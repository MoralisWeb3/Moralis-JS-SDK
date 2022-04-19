import { CoreModuleType } from '../Modules';
import { BaseClass } from './BaseClass';
import { BaseNetworkClass } from './BaseNetworkClass';

export type AnyBaseClass = BaseClass | BaseNetworkClass;

export const isBaseNetworkClass = (baseClass: AnyBaseClass): baseClass is BaseNetworkClass => {
  if (baseClass.type === CoreModuleType.NETWORK) {
    return true;
  }
  return false;
};
