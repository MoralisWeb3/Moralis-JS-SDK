import { ApiUtils } from '@moralisweb3/api-utils';
import { CommonEvmUtils } from '@moralisweb3/common-evm-utils';
import { Core, CoreProvider } from '@moralisweb3/common-core';
import { MoralisStreams } from '../src/MoralisStreams';
import { MOCK_API_KEY } from './mocks/config';
import { mockServer } from './mocks/mockServer';

export function setupStreamApi(): MoralisStreams {
  const core = Core.create();
  const apiUtils = ApiUtils.create(core);
  const commonEvmUtils = CommonEvmUtils.create(core);
  const streamsApi = MoralisStreams.create(core);

  CoreProvider.setDefault(core);

  core.registerModules([apiUtils, commonEvmUtils, streamsApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  mockServer.listen();

  return streamsApi;
}

export function cleanStreamsApi() {
  mockServer.close();
}
