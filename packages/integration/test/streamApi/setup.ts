import { MoralisApiUtils } from '@moralisweb3/api-utils';
import { MoralisEvmUtils } from '@moralisweb3/evm-utils';
import { MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { MoralisStreams } from '@moralisweb3/streams';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { streamServer } from '../../mockRequests/streamServer';

export function setupStreamApi(): MoralisStreams {
  const core = MoralisCore.create();
  const apiUtils = MoralisApiUtils.create(core);
  const evmUtils = MoralisEvmUtils.create(core);
  const streamsApi = MoralisStreams.create(core);

  MoralisCoreProvider.setDefault(core);

  core.registerModules([apiUtils, evmUtils, streamsApi]);
  core.start({
    apiKey: MOCK_API_KEY,
  });

  streamServer.listen({
    onUnhandledRequest: 'warn',
  });

  streamServer.listen();

  return streamsApi;
}

export function cleanStreamsApi() {
  streamServer.close();
}
