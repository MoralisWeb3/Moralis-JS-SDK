import { EvmAddress } from '@moralisweb3/core';
import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEnvApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEnvApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should resolve a domain and rerurn an address', async () => {
    const result = await evmApi.resolve.resolveDomain({
      domain: 'brad.crypto',
    });

    expect(result.toJSON().address).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'.toLowerCase());
    expect(result.raw.address).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
    expect(result.result.address.equals(EvmAddress.create('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'))).toBe(true);
  });
});
