import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('resolveDomain', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
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
