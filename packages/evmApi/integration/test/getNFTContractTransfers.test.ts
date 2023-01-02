import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTContractTransfers', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Contract Transfers', () => {
    it('should get the contract transfers of NFTs for a given contract', async () => {
      const result = await EvmApi.nft.getNFTContractTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      });

      const response = result.raw.result?.at(0);

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.raw.total).toBe(2000);
      expect(response?.token_address).toEqual('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
      expect(response?.transaction_hash).toEqual('0x057Ec652A4F150f7FF94f089A38008f49a0DF88e');
    });

    it('should not get the contract of NFT transfers of an invalid address and throw an error', async () => {
      const failedResult = await EvmApi.nft
        .getNFTContractTransfers({
          address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getNFTContractTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });

    it('should get the contract transfers of NFTs for a given contract, fromBlock and toBlock', async () => {
      const { result, pagination } = await EvmApi.nft.getNFTContractTransfers({
        address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        fromBlock: 16220200,
        toBlock: 16220260,
        limit: 5,
      });

      expect(result).toBeDefined();
      expect(pagination.total).toBe(14);
      expect(result).toEqual(expect.objectContaining({}));
      expect(result[0].tokenId).toBe('6955');
      expect(result[1].tokenId).toBe('6955');
      expect(result[2].tokenId).toBe('4221');
      expect(result[3].tokenId).toBe('4221');
      expect(result[4].tokenId).toBe('4221');
    });

    it('should get the contract transfers of NFTs for a given contract, fromDate and toDate', async () => {
      const { result, pagination } = await EvmApi.nft.getNFTContractTransfers({
        address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        fromDate: '2022-12-10',
        toDate: '2022-12-11',
        limit: 5,
      });

      expect(result).toBeDefined();
      expect(pagination.total).toBe(534);
      expect(result).toEqual(expect.objectContaining({}));
      expect(result[0].tokenId).toBe('2387');
      expect(result[1].tokenId).toBe('2387');
      expect(result[2].tokenId).toBe('7022');
      expect(result[3].tokenId).toBe('5655');
      expect(result[4].tokenId).toBe('3704');
    });
  });
});
