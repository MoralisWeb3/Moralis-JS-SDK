import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore } from '@moralisweb3/core';
import { MoralisSolApi } from '@moralisweb3/sol-api';
import { MoralisSolUtils } from '@moralisweb3/sol-utils';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequestSol';

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
