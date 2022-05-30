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

  it('should get the NFT transfers by block of a hash', async () => {
    const result = await EvmApi.native.getNFTTransfersByBlock({
      blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
    });

    expect(result).toBeDefined();
    expect(result.legacy.total).toBe(3);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT transfers by block of an invalid block number and throw an error ', async () => {
    const failedResult = await EvmApi.native
      .getNFTTransfersByBlock({
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b917',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.native.getNFTTransfersByBlock({
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b917',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid block number provided"`);
    expect(
      EvmApi.native.getNFTTransfersByBlock({
        blockNumberOrHash: '',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 404"`);
  });
});
