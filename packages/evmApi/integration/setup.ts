import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisEvmApi } from '../src/EvmApi';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer, mockServer2 } from './mocks/mockServer';

export function setupEvmApi(): MoralisEvmApi {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  const evmApi = MoralisEvmApi.create(core);

  // DO NOT SET `MoralisCoreProvider.setDefault(core)` here!

  core.registerModules([apiUtils, evmUtils, evmApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return evmApi;
}

export function setupEvmApi2(): MoralisEvmApi {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  const evmApi = MoralisEvmApi.create(core);

  MoralisCoreProvider.setDefault(core);

  core.registerModules([apiUtils, evmUtils, evmApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer2.listen({
    onUnhandledRequest: 'warn',
  });

  return evmApi;
}

export function cleanEvmApi() {
  mockServer.close();
}

export function cleanEvmApi2() {
  mockServer2.close();
}
