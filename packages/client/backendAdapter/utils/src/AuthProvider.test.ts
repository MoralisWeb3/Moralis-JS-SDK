import { Core } from '@moralisweb3/common-core';
import { Auth } from './Auth';
import { BackendAdapter } from './BackendAdapter';
import { AuthProvider } from './AuthProvider';
import { ApiClient } from './ApiClient';

class BackendAdapterMock implements BackendAdapter {
  public constructor(private readonly factory: () => Promise<Auth>) {}

  public createAuth(): Promise<Auth> {
    return this.factory();
  }

  public createApiClient(): ApiClient {
    throw new Error('Not implemented');
  }
}

describe('AuthProvider', () => {
  let core: Core;

  beforeEach(() => {
    core = Core.create();
  });

  it('returns the same instance', async () => {
    const backendAdapter = new BackendAdapterMock(async () => ({} as Auth));
    const authProvider = AuthProvider.create(backendAdapter, core);

    const promise1 = authProvider.get();
    const promise2 = authProvider.get();
    const promise3 = authProvider.get();

    const results = await Promise.all([promise1, promise2, promise3]);

    const firstAuth = results[0];
    expect(results[1]).toBe(firstAuth);
    expect(results[2]).toBe(firstAuth);
  });
});
