import { Auth, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { GeneralAuth } from './GeneralAuth';

export interface GeneralAuthAdapterOptions {
  // TODO: replace this property
  todo?: number;
}

export class GeneralAuthAdapter implements AuthAdapter {
  public static create(options?: GeneralAuthAdapterOptions): GeneralAuthAdapter {
    return new GeneralAuthAdapter(options || {});
  }

  public constructor(protected readonly options: GeneralAuthAdapterOptions) {}

  public async createAuth(_: Core): Promise<Auth> {
    return new GeneralAuth();
  }
}
