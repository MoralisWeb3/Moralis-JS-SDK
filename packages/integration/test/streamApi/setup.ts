import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisStreams } from '@moralisweb3/streams';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequestsStream';

export function setupStreamApi(): MoralisStreams {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const streamsApi = MoralisStreams.create(core);

  MoralisCoreProvider.setDefault(core);

  core.registerModules([apiUtils, streamsApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  mockServer.listen({
    onUnhandledRequest: 'warn',
  });

  return streamsApi;
}

export function cleanStreamsApi() {
  mockServer.close();
}
