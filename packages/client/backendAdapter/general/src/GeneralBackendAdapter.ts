import { ApiBackendAdapter, AuthBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { GeneralApiBackendAdapter } from './GeneralApiBackendAdapter';
import { GeneralAuthBackendAdapter } from './GeneralAuthBackendAdapter';

export interface GeneralBackendAdapterOptions {
  baseUrl?: string;
  // TODO: more options...
}

export class GeneralBackendAdapter implements BackendAdapter {
  public static create(options?: GeneralBackendAdapterOptions) {
    const baseUrl = options?.baseUrl ?? '/api/';
    return new GeneralBackendAdapter(baseUrl);
  }

  public constructor(private readonly baseUrl: string) {}

  public createApi(core: Core): ApiBackendAdapter {
    return new GeneralApiBackendAdapter(this.baseUrl, core);
  }

  public createAuth(core: Core): AuthBackendAdapter {
    return new GeneralAuthBackendAdapter(this.baseUrl, core);
  }
}
