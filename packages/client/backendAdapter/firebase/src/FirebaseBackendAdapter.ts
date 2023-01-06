import { FirebaseApp } from 'firebase/app';
import { Auth, browserSessionPersistence, getAuth } from 'firebase/auth';
import { Functions, getFunctions } from 'firebase/functions';
import { ApiClient, Auth as MoralisAuth, BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { Core } from '@moralisweb3/common-core';
import { FirebaseApiClient } from './FirebaseApiClient';
import { FirebaseAuth } from './FirebaseAuth';

export interface FirebaseBackendAdapterOptions {
  auth?: {
    auth?: Auth;
    functionNamePrefix?: string;
    functions?: Functions;
    regionOrCustomDomain?: string;
  };
  api?: {
    functionNamePrefix?: string;
    functions?: Functions;
    regionOrCustomDomain?: string;
  };
}

export class FirebaseBackendAdapter implements BackendAdapter {
  public static create(app: FirebaseApp, options?: FirebaseBackendAdapterOptions): FirebaseBackendAdapter {
    return new FirebaseBackendAdapter(app, options || {});
  }

  private constructor(private readonly app: FirebaseApp, private readonly options: FirebaseBackendAdapterOptions) {}

  public createApiClient(core: Core): ApiClient {
    const functions = this.options.api?.functions
      ? this.options.api.functions
      : getFunctions(this.app, this.options.api?.regionOrCustomDomain);
    return new FirebaseApiClient(functions, core, this.options.api?.functionNamePrefix);
  }

  public async createAuth(_: Core): Promise<MoralisAuth> {
    let auth: Auth;
    if (this.options.auth?.auth) {
      auth = this.options.auth.auth;
    } else {
      auth = getAuth(this.app);
      await auth.setPersistence(browserSessionPersistence);
    }

    const functions = this.options.auth?.functions
      ? this.options.auth.functions
      : getFunctions(this.app, this.options.auth?.regionOrCustomDomain);
    return new FirebaseAuth(auth, functions, this.options.auth?.functionNamePrefix);
  }
}
