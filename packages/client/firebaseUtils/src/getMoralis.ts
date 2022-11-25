import { FirebaseApp } from '@firebase/app';
import { BackendAdapter } from '@moralisweb3/client-backend-adapter-utils';
import { FirebaseBackendAdapter } from '@moralisweb3/client-backend-adapter-firebase';
import { Core } from '@moralisweb3/common-core';

export interface GetMoralisOptions {
  backendAdapter?: BackendAdapter;
}

export function getMoralis(app: FirebaseApp, options?: GetMoralisOptions, core?: Core): MoralisFirebase {
  if (!core) {
    core = Core.create();
  }

  const backendAdapter = options?.backendAdapter ?? FirebaseBackendAdapter.create(app);

  return {
    app,
    backendAdapter,
    core,
  };
}

export interface MoralisFirebase {
  app: FirebaseApp;
  backendAdapter: BackendAdapter;
  core: Core;
}
