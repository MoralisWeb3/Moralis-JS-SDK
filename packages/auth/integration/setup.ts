import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisSolUtils } from '@moralisweb3/sol-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisAuth } from '../src/MoralisAuth';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

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
