import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletNFTTransfers', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the NFTs Transfers of an account address', async () => {
    const result = await evmApi.nft.getWalletNFTTransfers({
      address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw.total).toBe(126);
  });

  it('should not get the NFTs Transfers and return an error code for an invalid address', () => {
    const failedResult = evmApi.nft
      .getWalletNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getWalletNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
