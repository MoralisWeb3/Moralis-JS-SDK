import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletNFTTransfers', () => {
  let EvmApi: EvmApi;

  beforeAll(() => {
    EvmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  describe('Get NFT Transfers By Wallet', () => {
    it('should get the Wallet NFT Transfers with a valid address', async () => {
      const result = await EvmApi.nft.getWalletNFTTransfers({
        address: '0xCE5035D51237B4D72f6910D4ecB625E4fD6460Ec',
        limit: 1,
      });

      expect(result.pagination.page).toBe(2);
      expect(result.pagination.total).toBe(2000);
      expect(result.result.length).toBe(1);

      const transfer0 = result.result[0];

      expect(transfer0.blockNumber.toString()).toBe('15410857');
      expect(transfer0.blockHash).toBe('0x2102747a6aa307f9bb6075598f054ee6c555755ae0ecd7cee88588bb9971663c');
      expect(transfer0.transactionHash).toBe('0xd986f6983b34e6dbc0561c42f72f0dabe9802bb53b0c46c22b23652bf4dd2a04');
      expect(transfer0.transactionIndex).toBe(131);
      expect(transfer0.logIndex).toBe(175);
      expect(transfer0.value?.ether).toBe('1.0');
      expect(transfer0.contractType).toBe('ERC721');
      expect(transfer0.transactionType).toBe('Single');
      expect(transfer0.tokenAddress.lowercase).toBe('0xbc6f8c94979207b5206a3e82a3d84dc82f987829');
      expect(transfer0.tokenId).toBe('1519');
      expect(transfer0.fromAddress?.lowercase).toBe('0x0000000000000000000000000000000000000000');
      expect(transfer0.toAddress?.lowercase).toBe('0xce5035d51237b4d72f6910d4ecb625e4fd6460ec');
      expect(transfer0.toAddress?.lowercase).toBe('0xce5035d51237b4d72f6910d4ecb625e4fd6460ec');
      expect(transfer0.amount).toBe(1);
      expect(transfer0.possibleSpam).toBe(false);
    });

    it('should throw a 400 Error on invalid address', async () => {
      const failedResult = await EvmApi.nft
        .getWalletNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        })
        .then()
        .catch((err) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        EvmApi.nft.getWalletNFTTransfers({
          address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        }),
      ).rejects.toThrowError('[C0005] Invalid address provided');
    });
  });
});
