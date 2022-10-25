import { ApiUtils } from '@moralisweb3/api-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/common-core';
import { MoralisAuth } from '../src/MoralisAuth';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupAuth(): MoralisAuth {
  const core = MoralisCore.create();
  const apiUtils = ApiUtils.create(core);
  const commonEvmUtils = CommonEvmUtils.create(core);
  const commonSolUtils = CommonSolUtils.create(core);
  const auth = MoralisAuth.create(core);

  MoralisCoreProvider.setDefault(core);

  core.registerModules([apiUtils, commonEvmUtils, commonSolUtils, auth]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return auth;
}

export function cleanAuth() {
  mockServer.close();
}
