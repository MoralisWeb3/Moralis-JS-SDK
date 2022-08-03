import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the NFT transfers by block of a hash', async () => {
    const result = await evmApi.native.getNFTTransfersByBlock({
      blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(3);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFT transfers by block of an invalid block number and throw an error ', async () => {
    const failedResult = await evmApi.native
      .getNFTTransfersByBlock({
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b917',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.native.getNFTTransfersByBlock({
        blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b917',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid block number provided"`);
    expect(
      evmApi.native.getNFTTransfersByBlock({
        blockNumberOrHash: '',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 404"`);
  });
});
