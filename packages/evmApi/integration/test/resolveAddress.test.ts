import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('resolveAddress', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns a name', async () => {
    const result = await evmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });

    expect(result?.result).toBeDefined();
    expect(result?.result.name).toEqual('vitalik.eth');
  });

  it('returns null when API returns HTTP 404', async () => {
    const result = await evmApi.resolve.resolveAddress({
      address: '0x4044044044044044044044044044044044044040',
    });

    expect(result).toBeNull();
  });
});
