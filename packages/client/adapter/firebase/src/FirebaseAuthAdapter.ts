import { Auth as MoralisAuth, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import { Auth, getAuth, browserSessionPersistence } from '@firebase/auth';
import { Functions, getFunctions } from '@firebase/functions';
import Core from '@moralisweb3/common-core';
import { FirebaseApp } from '@firebase/app';
import { FirebaseAuth } from './FirebaseAuth';

export interface FirebaseAuthAdapterOptions {
  auth?: () => Promise<Auth> | Auth;
  functionNamePrefix?: string;
  functions?: Functions;
  regionOrCustomDomain?: string;
}

export class FirebaseAuthAdapter implements AuthAdapter {
  public static create(app: FirebaseApp, options?: FirebaseAuthAdapterOptions): FirebaseAuthAdapter {
    return new FirebaseAuthAdapter(app, options || {});
  }

  private constructor(
    private readonly app: FirebaseApp,
    private readonly options: FirebaseAuthAdapterOptions | undefined,
  ) {}

  public async createAuth(_: Core): Promise<MoralisAuth> {
    let auth: Auth;
    if (this.options?.auth) {
      auth = typeof this.options.auth === 'function' ? await this.options.auth() : this.options.auth;
    } else {
      auth = getAuth(this.app);
      await auth.setPersistence(browserSessionPersistence);
    }

    let functions = this.options?.functions;
    if (!functions) {
      functions = getFunctions(this.app, this.options?.regionOrCustomDomain);
    }

    return new FirebaseAuth(auth, functions, this.options?.functionNamePrefix);
  }
}
