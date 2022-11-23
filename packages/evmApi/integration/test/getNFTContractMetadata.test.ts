import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTContractMetadata', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Contract Metadata', () => {
    it('should get the collection metadata for a given contract', async () => {
      const result = await EvmApi.nft.getNFTContractMetadata({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });
      const response = result?.raw!;

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(response.name).toEqual('KryptoKitties');
      expect(response.token_address).toEqual('0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09');
    });

    it('should not get the collection metadata for an invalid contract address and throw a 400 Error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTContractMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTContractMetadata({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
