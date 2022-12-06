import { Core } from '@moralisweb3/common-core';
import { Auth } from './Auth';
import { AuthAdapter } from './AuthAdapter';
import { AuthProvider } from './AuthProvider';

class AuthAdapterMock implements AuthAdapter {
  public constructor(private readonly factory: () => Promise<Auth>) {}

  createAuth(core: Core): Promise<Auth> {
    return this.factory();
  }
}

describe('AuthProvider', () => {
  let core: Core;

  beforeEach(() => {
    core = Core.create();
  });

  it('returns the same instance', async () => {
    const authAdapter = new AuthAdapterMock(async () => ({} as Auth));
    const authProvider = new AuthProvider(core, authAdapter);

    const promise1 = authProvider.get();
    const promise2 = authProvider.get();
    const promise3 = authProvider.get();

    const results = await Promise.all([promise1, promise2, promise3]);

    const firstAuth = results[0];
    expect(results[1]).toBe(firstAuth);
    expect(results[2]).toBe(firstAuth);
  });
});
