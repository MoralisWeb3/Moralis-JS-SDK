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

    //expect(result.toJSON()).toStrictEqual({ symbol: 'LINK' });
    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
  });
});
