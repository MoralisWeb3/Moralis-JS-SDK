import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('resolveDomain', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns an address', async () => {
    const result = await evmApi.resolve.resolveDomain({
      domain: 'brad.crypto',
    });

    expect(result?.result.address.checksum).toEqual('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
  });

  it('returns null when API returns HTTP 404', async () => {
    const result = await evmApi.resolve.resolveDomain({
      domain: 'notfound.crypto',
    });

    expect(result).toBeNull();
  });
});
