import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('syncNFTContract', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should sync NFT contract of an account', async () => {
    const result = await evmApi.nft.syncNFTContract({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result.result).toBeDefined();
    expect(result.raw).toStrictEqual({ success: true });
  });

  it('should not sync NFT contract of an invalid account and throw an error ', async () => {
    expect(
      evmApi.nft.syncNFTContract({
        address: '0x7de308',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
