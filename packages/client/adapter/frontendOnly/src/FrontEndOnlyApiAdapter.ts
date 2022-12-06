import { ApiAdapter, ApiOperationResolver } from '@moralisweb3/client-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { FrontEndOnlyApiOperationResolver } from './FrontEndOnlyApiOperationResolver';

export interface FrontEndOnlyApiAdapterOptions {
  publicApiKey: string;
}

export class FrontEndOnlyApiAdapter implements ApiAdapter {
  public static create(options: FrontEndOnlyApiAdapterOptions): FrontEndOnlyApiAdapter {
    return new FrontEndOnlyApiAdapter(options);
  }

  public constructor(protected readonly options: FrontEndOnlyApiAdapterOptions | undefined) {}

  public createResolver(_: Core): ApiOperationResolver {
    throw new FrontEndOnlyApiOperationResolver();
  }
}
