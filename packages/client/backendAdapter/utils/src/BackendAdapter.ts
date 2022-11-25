import { Core } from '@moralisweb3/common-core';
import { ApiBackendAdapter } from './ApiBackendAdapter';
import { AuthBackendAdapter } from './AuthBackendAdapter';

export interface BackendAdapter {
  createApi(core: Core): ApiBackendAdapter;
  createAuth(core: Core): AuthBackendAdapter;
}
