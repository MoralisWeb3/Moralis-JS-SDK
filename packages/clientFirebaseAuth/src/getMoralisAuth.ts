import { Functions, getFunctions } from '@firebase/functions';
import { FirebaseApp } from '@firebase/app';
import { Auth, getAuth } from '@firebase/auth';

export interface MoralisAuth {
  functions: Functions;
  auth: Auth;
  functionNamePrefix: string;
}

export interface GetMoralisAuthParams {
  /**
   * @default "ext-moralis-auth-"
   */
  functionNamePrefix?: string;
  functions?: Functions;
}

export function getMoralisAuth(app: FirebaseApp, params?: GetMoralisAuthParams): MoralisAuth {
  return {
    functionNamePrefix: params?.functionNamePrefix ?? 'ext-moralis-auth-',
    auth: getAuth(app),
    functions: params?.functions ?? getFunctions(app),
  };
}
