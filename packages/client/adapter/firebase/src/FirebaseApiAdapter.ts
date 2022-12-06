import { FirebaseApp } from '@firebase/app';
import { Functions, getFunctions } from '@firebase/functions';
import { ApiAdapter } from '@moralisweb3/client-adapter-utils';
import { ApiOperationResolver } from '@moralisweb3/client-adapter-utils/lib/ApiOperationResolver';
import { Core } from '@moralisweb3/common-core';
import { FirebaseApiOperationResolver } from './FirebaseApiOperationResolver';

export interface FirebaseApiAdapterOptions {
  functionNamePrefix?: string;
  functions?: Functions;
  regionOrCustomDomain?: string;
}

export class FirebaseApiAdapter implements ApiAdapter {
  public static create(app: FirebaseApp, options?: FirebaseApiAdapterOptions): FirebaseApiAdapter {
    let functions = options?.functions;
    if (!functions) {
      functions = getFunctions(app, options?.regionOrCustomDomain);
    }
    return new FirebaseApiAdapter(functions, options?.functionNamePrefix);
  }

  private constructor(private readonly functions: Functions, private readonly functionNamePrefix: string | undefined) {}

  public createResolver(core: Core): ApiOperationResolver {
    return new FirebaseApiOperationResolver(this.functions, core, this.functionNamePrefix);
  }
}
