import { MoralisApi } from '@moralisweb3/api';
import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisApi } from '@moralisweb3/api';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

export function setupEvmApi(): MoralisEvmApi {
  const core = MoralisCoreProvider.getDefault();
  const api = MoralisApi.create(core);
  const envApi = MoralisEvmApi.create(core);
  core.registerModules([api, envApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return envApi;
}

export function cleanEnvApi() {
  mockServer.close();
}
