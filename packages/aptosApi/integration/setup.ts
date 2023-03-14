import { ApiUtils } from '@moralisweb3/api-utils';
import { Core } from '@moralisweb3/common-core';
import { AptosApi } from '../src/AptosApi';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupAptosApi(): AptosApi {
  const core = Core.create();
  const apiUtils = ApiUtils.create(core);
  const aptosApi = AptosApi.create(core);
  core.registerModule(apiUtils);

  // DO NOT SET `CoreProvider.setDefault(core)` here!

  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return aptosApi;
}

export function cleanAptosApi() {
  mockServer.close();
}
