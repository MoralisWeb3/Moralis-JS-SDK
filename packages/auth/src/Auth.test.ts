import { ApiUtils } from '@moralisweb3/api-utils';
import { Core } from '@moralisweb3/common-core';
import { Auth } from './Auth';

describe('Auth', () => {
  function setupAuth() {
    const core = Core.create();
    const apiUtils = ApiUtils.create(core);
    const auth = Auth.create(core);
    core.registerModules([apiUtils, auth]);

    return { core, auth };
  }

  it('returns default baseUrl', () => {
    const { auth } = setupAuth();

    expect(auth.baseUrl).toBe('https://authapi.moralis.io');
  });
});
