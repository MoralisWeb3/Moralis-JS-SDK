import { ApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore } from '@moralisweb3/common-core';
import { CommonSolUtils } from '@moralisweb3/common-sol-utils';
import { SolApi } from '../src/SolApi';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupSolApi(): SolApi {
  const core = MoralisCore.create();
  const apiUtils = ApiUtils.create(core);
  const commonSolUtils = CommonSolUtils.create(core);
  const solApi = SolApi.create(core);

  // DO NOT SET `MoralisCoreProvider.setDefault(core)` here!

  core.registerModules([apiUtils, commonSolUtils, solApi]);
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
