import Core from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamEvmNftTransfer } from './StreamEvmNftTransfer';
import { mockStreamEvmNftTransferInput } from './StreamEvmNftTransfer.mock';

const testsInputs = Object.entries(mockStreamEvmNftTransferInput).map(([name, input]) => ({ name, input }));

describe('StreamEvmNftTransfer', () => {
  let core: Core;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const transaction = StreamEvmNftTransfer.create(input, core);
    const output = transaction.format();

    expect(transaction).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Erc721', () => {
    const input = mockStreamEvmNftTransferInput.ERC721;
    let evmNftTransfer: StreamEvmNftTransfer;

    beforeAll(() => {
      evmNftTransfer = StreamEvmNftTransfer.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Required
      expect(evmNftTransfer.chain.hex).toBe('0x1');
      expect(evmNftTransfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(evmNftTransfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(evmNftTransfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(evmNftTransfer.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(evmNftTransfer.logIndex).toBe(0);
      expect(evmNftTransfer.tokenId).toBe('123');
      expect(evmNftTransfer.tokenName).toBe('Stream');
      expect(evmNftTransfer.tokenSymbol).toBe('STREAMS');
      expect(evmNftTransfer.amount).toBe(1);

      // Optional
      expect(evmNftTransfer.tokenContractType).toBe('ERC721');
      expect(evmNftTransfer.operator?.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec8');
    });

    it('should cast the value to JSON succesfully', () => {
      const json = evmNftTransfer.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        amount: 1,
        tokenContractType: 'ERC721',
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
      });
    });

    it('should format() the values correctly', () => {
      const json = evmNftTransfer.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        amount: 1,
        tokenContractType: 'ERC721',
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
      });
    });

    it('should return return true for .equals() on equality match', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
      });

      expect(isEqual).toBe(true);
    });

    it('should return return false for .equals() on mismatching chain', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
        chain: '0x2',
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching contract', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec8',
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching logIndex', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
        logIndex: '1',
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching transactionHash', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
      });

      expect(isEqual).toBe(false);
    });

    it('should return return false for .equals() on mismatching tokenId', () => {
      const isEqual = evmNftTransfer.equals({
        ...mockStreamEvmNftTransferInput.ERC721,
        tokenId: '456',
      });

      expect(isEqual).toBe(false);
    });
  });
});
