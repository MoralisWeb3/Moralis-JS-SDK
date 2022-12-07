import { ApiClient, Auth, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { FrontEndOnlyApiClient } from './FrontEndOnlyApiClient';
import { FrontEndOnlyAuth } from './FrontEndOnlyAuth';

export interface FrontEndOnlyBackendAdapterOptions {
  publicApiKey: string;
}

export class FrontEndOnlyBackendAdapter implements BackendAdapter {
  public static create(options: FrontEndOnlyBackendAdapterOptions): FrontEndOnlyBackendAdapter {
    return new FrontEndOnlyBackendAdapter(options);
  }

  public constructor(protected readonly options: FrontEndOnlyBackendAdapterOptions | undefined) {}

  public createApiClient(_: Core): ApiClient {
    return new FrontEndOnlyApiClient();
  }

  public async createAuth(_: Core): Promise<Auth> {
    return new FrontEndOnlyAuth();
  }
}
