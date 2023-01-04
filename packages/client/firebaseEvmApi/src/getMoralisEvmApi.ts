import { FirebaseApp } from 'firebase/app';
import { Functions, getFunctions } from 'firebase/functions';
import { ClientEvmApi } from '@moralisweb3/client-evm-api';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { Core } from '@moralisweb3/common-core';
import { FirebaseClientRequestHandler } from '@moralisweb3/client-firebase-api-utils';

export interface GetMoralisEvmApiOptions {
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

export function getMoralisEvmApi(app: FirebaseApp, options?: GetMoralisEvmApiOptions): ClientEvmApi {
  const functions = options?.functions ?? getFunctions(app, options?.regionOrCustomDomain);
  const functionNamePrefix = options?.functionNamePrefix ?? 'ext-moralis-api-';

  let core = options?.core;
  if (!core) {
    core = Core.create();
    core.registerModule(CommonEvmUtils);
  }

  const requestHandler = new FirebaseClientRequestHandler('evm-api', functionNamePrefix, functions, core);
  return new ClientEvmApi(requestHandler);
}
