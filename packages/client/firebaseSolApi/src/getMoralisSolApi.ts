import { FirebaseApp } from '@firebase/app';
import { ClientSolApi } from '@moralisweb3/client-sol-api';
import { Functions, getFunctions } from '@firebase/functions';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { Core } from '@moralisweb3/common-core';
import { FirebaseClientRequestHandler } from '@moralisweb3/client-firebase-api-utils';

export interface GetMoralisSolApiOptions {
  /**
   * @default "ext-moralis-api-"
   */
  functionNamePrefix?: string;

  /**
   * @description The region the callable functions are located or a custom domain.
   * @example "asia-south1"
   */
  regionOrCustomDomain?: string;

  /**
   * @description Own instance of the `Functions` class.
   */
  functions?: Functions;

  /**
   * @description Own instance of the `Core` class.
   */
  core?: Core;
}

export function getMoralisSolApi(app: FirebaseApp, options?: GetMoralisSolApiOptions): ClientSolApi {
  const functions = options?.functions ?? getFunctions(app, options?.regionOrCustomDomain);
  const functionNamePrefix = options?.functionNamePrefix ?? 'ext-moralis-api-';

  let core = options?.core;
  if (!core) {
    core = Core.create();
    core.registerModule(CommonSolUtils);
  }

  const requestHandler = new FirebaseClientRequestHandler('sol-api', functionNamePrefix, functions, core);
  return new ClientSolApi(requestHandler);
}
