import Core from '@moralis/core';
import EvmApi from '@moralis/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should resync Meta data for an address', async () => {
    const result = await EvmApi.token.reSyncMetadata({
      address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C5',
      tokenId: '18',
    });

    expect(result.toJSON().status).toBe('Request initiated');
  });

  it('should not resync Meta data for an invalid address', () => {
    const failedResult = EvmApi.token
      .reSyncMetadata({
        address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C',
        tokenId: '18',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.reSyncMetadata({
        address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5d5',
        tokenId: '18',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
