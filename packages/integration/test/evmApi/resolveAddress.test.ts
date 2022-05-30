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

  it('should resolve an address and return a name', async () => {
    const result = await EvmApi.resolve.resolveAddress({
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    });

    expect(result.toJSON().name).toBe('vitalik.eth');
    expect(result).toBeDefined();
    expect(result.toJSON().name).toBe('vitalik.eth'.toLowerCase());
    expect(result.legacy.name).toBe('vitalik.eth');
    expect(result.result.name).toBe('vitalik.eth');
  });

  it('should not resolve an address and return an error code', async () => {
    const failedResult = await EvmApi.resolve
      .resolveAddress({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.resolve.resolveAddress({
        address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA9604',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
