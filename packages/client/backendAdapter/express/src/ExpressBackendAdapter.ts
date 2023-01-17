import { ApiClient, Auth, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { ExpressApiClient, ExpressApiClientOptions } from './ExpressApiClient';
import { ExpressAuth, ExpressAuthOptions } from './ExpressAuth';

export interface ExpressBackendAdapterOptions {
  /**
   * Base url of your express application
   * to access Moralis Module Routers
   * @example: 'http://127.0.0.1:4000/api'
   */
  baseUrl: string;
  api?: ExpressApiClientOptions;
  auth?: ExpressAuthOptions;
}

export class ExpressBackendAdapter implements BackendAdapter {
  public static create(options: ExpressBackendAdapterOptions): ExpressBackendAdapter {
    return new ExpressBackendAdapter(options);
  }

  public constructor(protected readonly options: ExpressBackendAdapterOptions) {}

  public createApiClient(core: Core): ApiClient {
    return new ExpressApiClient(core, this.options.baseUrl, this.options.api);
  }

  public async createAuth(core: Core): Promise<Auth> {
    return new ExpressAuth(core, this.options.baseUrl, this.options.auth);
  }
}
