import Core, { EvmAddress } from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen({ onUnhandledRequest: 'warn' });
  });

  afterAll(() => {
    server.close();
  });

  it('should resolve a domain and rerurn an address', async () => {
    const result = await EvmApi.resolve.resolveDomain({
      domain: 'brad.crypto',
    });

    expect(result.toJSON().address).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'.toLowerCase());
    expect(result.legacy.address).toBe('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
    expect(result.result.address.equals(new EvmAddress('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e'))).toBe(true);
  });
});
