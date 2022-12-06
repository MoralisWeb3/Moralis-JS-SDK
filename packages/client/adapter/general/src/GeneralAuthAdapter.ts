import { Auth, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import Core from '@moralisweb3/common-core';

export interface GeneralAuthAdapterOptions {
  // TODO: replace this property
  todo?: number;
}

export class GeneralAuthAdapter implements AuthAdapter {
  public static create(options?: GeneralAuthAdapterOptions): GeneralAuthAdapter {
    return new GeneralAuthAdapter(options || {});
  }

  public constructor(protected readonly options: GeneralAuthAdapterOptions) {}

  public createAuth(_: Core): Promise<Auth> {
    // TODO: add implementation
    throw new Error('Method not implemented.');
  }
}
