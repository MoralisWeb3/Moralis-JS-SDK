import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisEvmUtils } from '@moralisweb3/common-evm-utils';
import { MoralisSolUtils } from '@moralisweb3/common-sol-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisAuth } from '@moralisweb3/auth';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequestsAuth';

export function setupAuth(): MoralisAuth {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  const solUtils = MoralisSolUtils.create(core);
  const auth = MoralisAuth.create(core);

  MoralisCoreProvider.setDefault(core);

  core.registerModules([apiUtils, evmUtils, solUtils, auth]);
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
