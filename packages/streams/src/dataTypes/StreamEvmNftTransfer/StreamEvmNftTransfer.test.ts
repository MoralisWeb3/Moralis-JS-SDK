import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamEvmNftTransfer } from './StreamEvmNftTransfer';
import { StreamEvmNftTransferInput } from './types';

const mockErc721Transfer: StreamEvmNftTransferInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  logIndex: '0',
  contractType: 'ERC721',
  operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
  fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  tokenId: '123',
  tag: 'test-tag',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
};

const mockErc1155Transfer: StreamEvmNftTransferInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  logIndex: '0',
  contractType: 'ERC1155',
  operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
  fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  tokenId: '123',
  tag: 'test-tag',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  amount: '50',
};

describe('StreamEvmNftTransfer', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  describe('ERC721', () => {
    it('should create a new StreamEvmNftTransfer succesfully', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc721Transfer, core);

      // Read values from NFT
      expect(evmNftTransfer.chain.decimal).toBe(1);
      expect(evmNftTransfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(evmNftTransfer.tokenAddress.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(evmNftTransfer.logIndex).toBe(0);
      expect(evmNftTransfer.contractType).toBe('ERC721');
      expect(evmNftTransfer.operator?.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec8');
      expect(evmNftTransfer.fromAddress?.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(evmNftTransfer.toAddress?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(evmNftTransfer.tokenId).toBe('123');
      expect(evmNftTransfer.tag).toBe('test-tag');
      expect(evmNftTransfer.tokenName).toBe('Stream');
      expect(evmNftTransfer.tokenSymbol).toBe('STREAMS');
      expect(evmNftTransfer.amount).toBeUndefined();

      // Getters for Streams
      expect(evmNftTransfer.tokenContractType).toBe('ERC721');
      expect(evmNftTransfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(evmNftTransfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
    });

    it('should parse the values to JSON correctly', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc721Transfer, core);

      expect(evmNftTransfer.toJSON()).toStrictEqual({
        amount: undefined,
        block: undefined,
        chain: '0x1',
        contractType: 'ERC721',
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        logIndex: 0,
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
        tag: 'test-tag',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: undefined,
        transactionType: undefined,
        value: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc721Transfer, core);

      expect(evmNftTransfer.format()).toStrictEqual({
        amount: undefined,
        block: undefined,
        chain: '0x1',
        contractType: 'ERC721',
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        logIndex: 0,
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
        tag: 'test-tag',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: undefined,
        transactionType: undefined,
        value: undefined,
      });
    });
  });

  describe('ERC1155', () => {
    it('should create a new StreamEvmNftTransfer succesfully', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc1155Transfer, core);

      // Read values from NFT
      expect(evmNftTransfer.chain.decimal).toBe(1);
      expect(evmNftTransfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(evmNftTransfer.tokenAddress.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(evmNftTransfer.logIndex).toBe(0);
      expect(evmNftTransfer.contractType).toBe('ERC1155');
      expect(evmNftTransfer.operator?.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec8');
      expect(evmNftTransfer.fromAddress?.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(evmNftTransfer.toAddress?.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(evmNftTransfer.tokenId).toBe('123');
      expect(evmNftTransfer.tag).toBe('test-tag');
      expect(evmNftTransfer.tokenName).toBe('Stream');
      expect(evmNftTransfer.tokenSymbol).toBe('STREAMS');
      expect(evmNftTransfer.amount).toBe(50);

      // Getters for Streams
      expect(evmNftTransfer.tokenContractType).toBe('ERC1155');
      expect(evmNftTransfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(evmNftTransfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
    });

    it('should parse the values to JSON correctly', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc1155Transfer, core);

      expect(evmNftTransfer.toJSON()).toStrictEqual({
        amount: 50,
        block: undefined,
        chain: '0x1',
        contractType: 'ERC1155',
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        logIndex: 0,
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
        tag: 'test-tag',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: undefined,
        transactionType: undefined,
        value: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const evmNftTransfer = StreamEvmNftTransfer.create(mockErc1155Transfer, core);

      expect(evmNftTransfer.format()).toStrictEqual({
        amount: 50,
        block: undefined,
        chain: '0x1',
        contractType: 'ERC1155',
        fromAddress: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        logIndex: 0,
        operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
        tag: 'test-tag',
        toAddress: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenId: '123',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        transactionIndex: undefined,
        transactionType: undefined,
        value: undefined,
      });
    });
  });
});
