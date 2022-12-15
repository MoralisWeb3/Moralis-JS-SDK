import { Core } from '@moralisweb3/common-core';
import { Auth } from './Auth';
import { ApiClient } from './ApiClient';

export interface BackendAdapter {
  createApiClient(core: Core): ApiClient;
  createAuth(core: Core): Promise<Auth>;
}
