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

  it('should get price, native price for an address', async () => {
    const result = await EvmApi.token.getTokenPrice({
      address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C5',
    });

    expect(result.toJSON().usdPrice).toBe(162922.83762653428);
  });

  it('should not get price for an address and return an error code', () => {
    const failedResult = EvmApi.token
      .getTokenPrice({
        address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5C',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getTokenPrice({
        address: '0xEA47B64e1BFCCb773A0420247C0aa0a3C1D2E5d5',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
