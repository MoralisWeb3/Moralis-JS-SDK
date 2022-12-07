import { ApiAdapter, ApiOperationResolver } from '@moralisweb3/client-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { GeneralApiOperationResolver } from './GeneralApiOperationResolver';

export interface GeneralApiAdapterOptions {
  // TODO: add properties
  backendUrl?: string;
}

export class GeneralApiAdapter implements ApiAdapter {
  public static create(options?: GeneralApiAdapterOptions): GeneralApiAdapter {
    return new GeneralApiAdapter(options || {});
  }

  public constructor(protected readonly options: GeneralApiAdapterOptions | undefined) {}

  public createResolver(_: Core): ApiOperationResolver {
    return new GeneralApiOperationResolver();
  }
}
