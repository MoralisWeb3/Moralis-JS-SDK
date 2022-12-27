import { FirebaseApp } from '@firebase/app';
import { BackendAdapter, AuthProvider } from '@moralisweb3/client-backend-adapter-utils';
import { FirebaseBackendAdapter, FirebaseBackendAdapterOptions } from '@moralisweb3/client-backend-adapter-firebase';
import { Core } from '@moralisweb3/common-core';

export interface GetMoralisOptions {
  backendAdapter?: BackendAdapter;
  defaultBackendAdapter?: FirebaseBackendAdapterOptions;
}

export function getMoralis(app: FirebaseApp, options?: GetMoralisOptions, core?: Core): MoralisFirebase {
  if (!core) {
    core = Core.create();
  }

  const backendAdapter = options?.backendAdapter ?? FirebaseBackendAdapter.create(app, options?.defaultBackendAdapter);
  const authProvider = AuthProvider.create(backendAdapter, core);

  return {
    app,
    backendAdapter,
    authProvider,
    core,
  };
}

export interface MoralisFirebase {
  app: FirebaseApp;
  backendAdapter: BackendAdapter;
  authProvider: AuthProvider;
  core: Core;
}
