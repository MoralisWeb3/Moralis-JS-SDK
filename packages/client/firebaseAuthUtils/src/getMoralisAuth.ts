import { Functions, getFunctions } from '@firebase/functions';
import { FirebaseApp } from '@firebase/app';
import { Auth, getAuth } from '@firebase/auth';

export interface MoralisAuth {
  auth: Auth;
  functions: Functions;
  functionNamePrefix: string;
}

export interface GetMoralisAuthOptions {
  /**
   * @default "ext-moralis-auth-"
   */
  functionNamePrefix?: string;

  /**
   * @description The region the callable functions are located or a custom domain.
   * @example "asia-south1"
   */
  regionOrCustomDomain?: string;

  /**
   * @description Own instance of the `Auth` class.
   */
  auth?: Auth;

  /**
   * @description Own instance of the `Functions` class.
   */
  functions?: Functions;
}

export function getMoralisAuth(app: FirebaseApp, options?: GetMoralisAuthOptions): MoralisAuth {
  if (options?.regionOrCustomDomain && options?.functions) {
    throw new Error('You cannot set "regionOrCustomDomain" and "functions" parameters at the same time');
  }

  return {
    functionNamePrefix: options?.functionNamePrefix ?? 'ext-moralis-auth-',
    auth: options?.auth ?? getAuth(app),
    functions: options?.functions ?? getFunctions(app, options?.regionOrCustomDomain),
  };
}
