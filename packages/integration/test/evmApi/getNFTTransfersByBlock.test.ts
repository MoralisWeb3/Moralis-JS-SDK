import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('getNFTTransfersByBlock', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the NFT transfers by block of a hash', async () => {
    const result = await evmApi.nft.getNFTTransfersByBlock({
      blockNumberOrHash: '0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(3);
    expect(result).toEqual(expect.objectContaining({}));
  });
});
