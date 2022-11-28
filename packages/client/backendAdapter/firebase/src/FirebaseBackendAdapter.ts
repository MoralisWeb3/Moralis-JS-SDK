import { ApiBackendAdapter, AuthBackendAdapter, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { FirebaseApp } from '@firebase/app';
import { getFunctions } from '@firebase/functions';
import { FirebaseApiBackendAdapter, FirebaseApiBackendAdapterOptions } from './FirebaseApiBackendAdapter';
import { Functions } from '@firebase/functions';
import { FirebaseAuthBackendAdapter, FirebaseAuthBackendAdapterOptions } from './FirebaseAuthBackendAdapter';

export interface FirebaseBackendAdapterOptions {
  functions?: Functions;
  regionOrCustomDomain?: string;

  api?: FirebaseApiBackendAdapterOptions;
  auth?: FirebaseAuthBackendAdapterOptions;
}

export class FirebaseBackendAdapter implements BackendAdapter {
  public static create(app: FirebaseApp, options?: FirebaseBackendAdapterOptions) {
    const functions = options?.functions ?? getFunctions(app, options?.regionOrCustomDomain);
    return new FirebaseBackendAdapter(functions, options);
  }

  public constructor(
    private readonly functions: Functions,
    private readonly options: FirebaseBackendAdapterOptions | undefined,
  ) {}

  public createApi(core: Core): ApiBackendAdapter {
    return new FirebaseApiBackendAdapter(this.functions, core, this.options?.api);
  }

  public createAuth(): AuthBackendAdapter {
    return new FirebaseAuthBackendAdapter(this.functions, this.options?.auth);
  }
}
