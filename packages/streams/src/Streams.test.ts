import { ApiUtils } from '@moralisweb3/api-utils';
import { Core } from '@moralisweb3/common-core';
import { Streams } from './Streams';

describe('Streams', () => {
  function setupStreams() {
    const core = Core.create();
    const apiUtils = ApiUtils.create(core);
    const streams = Streams.create(core);
    core.registerModules([apiUtils, streams]);

    return { core, streams };
  }

  it('returns default baseUrl', () => {
    const { streams } = setupStreams();

    expect(streams.baseUrl).toBe('https://api.moralis-streams.com');
  });
});
