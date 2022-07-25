import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmApi } from '@moralisweb3/evm-api';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

export function setupEvmApi(): MoralisEvmApi {
  const core = MoralisCoreProvider.getDefault();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  const evmApi = MoralisEvmApi.create(core);

  core.registerModules([apiUtils, evmUtils, evmApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return evmApi;
}

export function cleanEvmApi() {
  mockServer.close();
}
