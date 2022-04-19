import { CoreModuleType } from '../Modules';
import { BaseClass, BaseClassConfig } from './BaseClass';

export interface BaseApiClassConfig extends BaseClassConfig {
  baseUrl: string;
}

export abstract class BaseApiClass extends BaseClass {
  type: CoreModuleType.API;
  baseUrl: string;

  constructor({ name, type = CoreModuleType.DEFAULT, baseUrl, core }: BaseApiClassConfig) {
    super({ name, type, core });
    this.type = CoreModuleType.API;
    this.baseUrl = baseUrl;
  }
}
