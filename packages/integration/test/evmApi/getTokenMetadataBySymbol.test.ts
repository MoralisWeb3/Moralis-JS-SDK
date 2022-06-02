import Core from '@moralisweb3/core';
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

    server.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the metadata by symbol', async () => {
    const result = await EvmApi.token.getTokenMetadataBySymbol({
      symbols: ['LINK'],
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
    expect(result.raw).toStrictEqual({ address: '0x514910771af9ca656af840dff83e8264ecf986ca' });
  });
});
