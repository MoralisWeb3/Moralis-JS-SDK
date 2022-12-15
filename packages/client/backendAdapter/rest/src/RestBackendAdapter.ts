import { ApiClient, Auth, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import Core from '@moralisweb3/common-core';
import { RestApiClient } from './RestApiClient';
import { RestAuth } from './RestAuth';

export interface RestBackendAdapterOptions {
  // TODO: add properties
  backendUrl?: string;
}

export class RestBackendAdapter implements BackendAdapter {
  public static create(options?: RestBackendAdapterOptions): RestBackendAdapter {
    return new RestBackendAdapter(options || {});
  }

  public constructor(protected readonly options: RestBackendAdapterOptions | undefined) {}

  public createApiClient(_: Core): ApiClient {
    return new RestApiClient();
  }

  public async createAuth(_: Core): Promise<Auth> {
    return new RestAuth();
  }
}
