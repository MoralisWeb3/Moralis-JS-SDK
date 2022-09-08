import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getWalletNFTCollections', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the Nft collections of an account address', async () => {
    const result = await evmApi.nft.getWalletNFTCollections({
      address: '0x3514980793dceae1b34d0144e3ae725bee084a70',
    });

    expect(result).toBeDefined();
    expect(result.pagination.total).toBe(1);
    expect(result.pagination.page).toBe(1);
    expect(result.toJSON()[0]).toEqual(
      expect.objectContaining({
        chain: '0x1',
        contractType: 'ERC721',
        name: 'Test NFT',
        symbol: 'TEST',
        tokenAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
      }),
    );
  });

  it('should not get the Nft collections and return an error code for an invalid address', () => {
    const failedResult = evmApi.nft
      .getWalletNFTCollections({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getWalletNFTCollections({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
