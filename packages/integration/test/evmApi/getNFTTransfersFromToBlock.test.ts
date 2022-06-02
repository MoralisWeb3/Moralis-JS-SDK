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

  it('should get the NFT transfers from to block of a hash', async () => {
    const result = await EvmApi.token.getNftTransfersFromToBlock({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      fromBlock: 1,
    });

    expect(result).toBeDefined();
    expect(result.legacy.total).toBe(118072744);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT transfers from to block of an invalid block number and throw an error ', async () => {
    const failedResult = await EvmApi.token
      .getNftTransfersFromToBlock({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        fromBlock: 1,
      })
      .then()
      .catch((err) => {
        return err;
      });
    expect(failedResult).toBeDefined();
    expect(
      EvmApi.token.getNftTransfersFromToBlock({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        fromBlock: 1,
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
