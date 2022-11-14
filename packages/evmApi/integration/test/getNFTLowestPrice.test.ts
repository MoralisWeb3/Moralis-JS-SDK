import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTLowestPrice', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns a data', async () => {
    const response = await evmApi.nft.getNFTLowestPrice({
      address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
    });
    const result = response?.result!;

    expect(result).toBeDefined();
    expect(result.result.blockNumber.toString()).toBe('15401671');
    expect(result.result.blockHash).toBe('0x69de52caa13ac1c165d6b408a47f7ed79cef12280d1d26099d9c0d2b63b52626');
    expect(result.result.price.wei).toBe('66990000000000000000');
  });

  it('returns null when API returns HTTP 404', async () => {
    const response = await evmApi.nft.getNFTLowestPrice({
      address: '0x4044044044044044044044044044044044044040',
    });

    expect(response).toBeNull();
  });

  it('returns null when API returns false-positive not found', async () => {
    const response = await evmApi.nft.getNFTLowestPrice({
      address: '0x2000000000000000000404404404404404404404',
    });
    expect(response).toBeNull();
  });
});
