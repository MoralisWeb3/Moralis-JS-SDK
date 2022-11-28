import { ApiBackendAdapter, AuthBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { GeneralApiBackendAdapter, GeneralApiBackendAdapterOptions } from './GeneralApiBackendAdapter';
import { GeneralAuthBackendAdapter, GeneralAuthBackendAdapterOptions } from './GeneralAuthBackendAdapter';

export interface GeneralBackendAdapterOptions {
  api?: GeneralApiBackendAdapterOptions;
  auth?: GeneralAuthBackendAdapterOptions;
}

export class GeneralBackendAdapter implements BackendAdapter {
  public static create(options?: GeneralBackendAdapterOptions) {
    return new GeneralBackendAdapter(options || {});
  }

  public constructor(private readonly options: GeneralBackendAdapterOptions | undefined) {}

  public createApi(core: Core): ApiBackendAdapter {
    return new GeneralApiBackendAdapter(core, this.options?.api);
  }

  public createAuth(core: Core): AuthBackendAdapter {
    return new GeneralAuthBackendAdapter(core, this.options?.auth);
  }
}
