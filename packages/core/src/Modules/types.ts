import { ApiModule } from './ApiModule';
import { BaseModule } from './BaseModule';
import { NetworkModule } from './NetworkModule';

export type AnyBaseClass = BaseModule | NetworkModule | ApiModule;
