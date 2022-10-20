import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore } from '@moralisweb3/core';
import { MoralisSolUtils } from '@moralisweb3/common-sol-utils';
import { MoralisSolApi } from '../src/MoralisSolApi';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupSolApi(): MoralisSolApi {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const solUtils = MoralisSolUtils.create(core);
  const solApi = MoralisSolApi.create(core);

  // DO NOT SET `MoralisCoreProvider.setDefault(core)` here!

  core.registerModules([apiUtils, solUtils, solApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return solApi;
}

export function cleanSolApi() {
  mockServer.close();
}
