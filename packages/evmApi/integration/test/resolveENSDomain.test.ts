import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('resolveENSDomain', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns an address', async () => {
    const result = await evmApi.resolve.resolveENSDomain({
      domain: 'nick.eth',
    });

    expect(result?.result.address.checksum).toEqual('0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5');
  });

  it('returns null when API returns HTTP 404', async () => {
    const result = await evmApi.resolve.resolveENSDomain({
      domain: 'unknown.eth',
    });

    expect(result).toBeNull();
  });
});
