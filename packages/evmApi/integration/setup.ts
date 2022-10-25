import { ApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore } from '@moralisweb3/core';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { EvmApi } from '../src/EvmApi';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupEvmApi(): EvmApi {
  const core = MoralisCore.create();
  const apiUtils = ApiUtils.create(core);
  const commonEvmUtils = CommonEvmUtils.create(core);
  const evmApi = EvmApi.create(core);

  // DO NOT SET `MoralisCoreProvider.setDefault(core)` here!

  core.registerModules([apiUtils, commonEvmUtils, evmApi]);
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
