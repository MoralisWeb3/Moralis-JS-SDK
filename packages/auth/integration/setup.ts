import { ApiUtils } from '@moralisweb3/api-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { Auth } from '../src/Auth';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupAuth(): Auth {
  const core = Core.create();
  const apiUtils = ApiUtils.create(core);
  const commonEvmUtils = CommonEvmUtils.create(core);
  const commonSolUtils = CommonSolUtils.create(core);
  const auth = Auth.create(core);

  CoreProvider.setDefault(core);

  core.registerModules([apiUtils, commonEvmUtils, commonSolUtils, auth]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  mockServer.listen();
  return auth;
}

export function cleanAuth() {
  mockServer.close();
}
