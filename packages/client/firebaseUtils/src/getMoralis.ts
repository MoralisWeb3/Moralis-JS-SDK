import { FirebaseApp } from '@firebase/app';
import { ApiAdapter, AuthAdapter } from '@moralisweb3/client-adapter-utils';
import {
  FirebaseApiAdapter,
  FirebaseApiAdapterOptions,
  FirebaseAuthAdapter,
  FirebaseAuthAdapterOptions,
} from '@moralisweb3/client-adapter-firebase';
import { Core } from '@moralisweb3/common-core';

export interface GetMoralisOptions {
  apiAdapter?: ApiAdapter;
  defaultApiAdapterOptions?: FirebaseApiAdapterOptions;

  authAdapter?: AuthAdapter;
  defaultAuthAdapterOptions?: FirebaseAuthAdapterOptions;
}

export function getMoralis(app: FirebaseApp, options?: GetMoralisOptions, core?: Core): MoralisFirebase {
  if (!core) {
    core = Core.create();
  }

  const apiAdapter = options?.apiAdapter ?? FirebaseApiAdapter.create(app, options?.defaultApiAdapterOptions);
  const authAdapter = options?.authAdapter ?? FirebaseAuthAdapter.create(app, options?.defaultAuthAdapterOptions);

  return {
    app,
    apiAdapter,
    authAdapter,
    core,
  };
}

export interface MoralisFirebase {
  app: FirebaseApp;
  apiAdapter: ApiAdapter;
  authAdapter: AuthAdapter;
  core: Core;
}
