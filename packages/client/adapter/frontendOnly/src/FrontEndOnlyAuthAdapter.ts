import { Auth, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import Core from '@moralisweb3/common-core';
import { FrontEndOnlyAuth } from './FrontEndOnlyAuth';

export interface FrontEndOnlyAuthAdapterOptions {
  publicApiKey: string;
}

export class FrontEndOnlyAuthAdapter implements AuthAdapter {
  public static create(options: FrontEndOnlyAuthAdapterOptions): FrontEndOnlyAuthAdapter {
    return new FrontEndOnlyAuthAdapter(options);
  }

  public constructor(protected readonly options: FrontEndOnlyAuthAdapterOptions) {}

  public async createAuth(_: Core): Promise<Auth> {
    return new FrontEndOnlyAuth();
  }
}
