import { Functions, getFunctions } from '@firebase/functions';
import { FirebaseApp, getApp } from '@firebase/app';
import { Auth, getAuth } from '@firebase/auth';

export interface MoralisAuth {
  auth: Auth;
  functions: Functions;
  functionNamePrefix: string;
}

export interface MoralisAuthOptions {
  /**
   * @default "ext-moralis-auth-"
   */
  functionNamePrefix?: string;
  functions?: Functions;
}

export function getMoralisAuth(app?: FirebaseApp, options?: MoralisAuthOptions): MoralisAuth {
  if (!app) {
    app = getApp();
  }
  return {
    functionNamePrefix: options?.functionNamePrefix ?? 'ext-moralis-auth-',
    auth: getAuth(app),
    functions: options?.functions ?? getFunctions(app),
  };
}
