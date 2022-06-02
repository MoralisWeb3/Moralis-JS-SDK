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

  it('should get the block of an account', async () => {
    const result = await EvmApi.native.getBlock({
      block_number_or_hash: '1000000',
    });

    expect(result).toBeDefined();
    expect(result.raw.hash).toBe('0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the block of an hash and throw an error ', async () => {
    const failedResult = await EvmApi.native
      .getBlock({
        block_number_or_hash: '100000',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.native.getBlock({
        block_number_or_hash: '100000',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
