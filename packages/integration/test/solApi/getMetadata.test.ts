import { MoralisSolApi } from '@moralisweb3/sol-api';
import { cleanSolApi, setupSolApi } from './setup';

describe('Moralis SolApi', () => {
  let SolApi: MoralisSolApi;

  beforeAll(() => {
    SolApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('should get the NFT Metadata of an account ', async () => {
    const result = await SolApi.nft.getNFTMetadata({
      network: 'mainnet',
      address: 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ mint: 'A8rFZ2Y3Kcr2A84A23f3z3rw47BTNp5haxYCUwUE8bCU' });
  });

  it('should not get the NFT Metadata of an account', async () => {
    const failedResult = await SolApi.nft
      .getNFTMetadata({
        network: 'mainnet',
        address: 'A8rFZ2Y3Kcr2A',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.nft.getNFTMetadata({
        network: 'mainnet',
        address: 'A8rFZ',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
