import { ApiUtils } from '@moralisweb3/api-utils';
import { Core } from '@moralisweb3/common-core';
import { SolApi } from './SolApi';

describe('SolApi', () => {
  function setupSolApi() {
    const core = Core.create();
    const apiUtils = ApiUtils.create(core);
    const solApi = SolApi.create(core);
    core.registerModules([apiUtils, solApi]);

    return { core, solApi };
  }

  it('returns default baseUrl', () => {
    const { solApi } = setupSolApi();

    expect(solApi.baseUrl).toBe('https://solana-gateway.moralis.io');
  });

  it('supports custom baseUrl', () => {
    const customBaseUrl = 'https://custom-sol-api-url.com';

    const { core, solApi } = setupSolApi();

    core.config.set('solApiBaseUrl', customBaseUrl);

    expect(solApi.baseUrl).toBe(customBaseUrl);
  });
});
