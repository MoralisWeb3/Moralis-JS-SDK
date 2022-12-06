import { Core } from '@moralisweb3/common-core';
import { ApiOperationResolver } from './ApiOperationResolver';

export interface ApiAdapter {
  createResolver(core: Core): ApiOperationResolver;
}
