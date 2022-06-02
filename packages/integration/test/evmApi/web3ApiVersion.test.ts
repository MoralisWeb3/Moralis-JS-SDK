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

    server.listen({ onUnhandledRequest: 'warn' });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the info Version for web3 Api ', async () => {
    const result = await EvmApi.info.web3ApiVersion({});

    expect(result.toJSON().version).toBe('0.0.53');
    expect(result.raw.version).toBe('0.0.53');
    expect(result.result.version).toBe('0.0.53');
  });
});
