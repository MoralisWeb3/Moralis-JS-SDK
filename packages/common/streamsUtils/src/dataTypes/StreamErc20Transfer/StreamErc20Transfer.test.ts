import Core from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamErc20Transfer } from './StreamErc20Transfer';
import { mockStreamErc20Transfer } from './StreamErc20Transfer.mock';

const testsInputs = Object.entries(mockStreamErc20Transfer).map(([name, input]) => ({ name, input }));

describe('StreamErc20Transfer', () => {
  let core: Core;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const transfer = StreamErc20Transfer.create(input, core);
    const output = transfer.format();

    expect(transfer).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Full', () => {
    const input = mockStreamErc20Transfer.FULL;
    let transfer: StreamErc20Transfer;

    beforeAll(() => {
      transfer = StreamErc20Transfer.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Read values
      expect(transfer.chain.hex).toBe('0x1');
      expect(transfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transfer.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(transfer.logIndex).toBe(0);
      expect(transfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transfer.value.toString()).toBe('12345');
      expect(transfer.valueWithDecimals).toBe('0.012345');
      expect(transfer.tokenDecimals).toBe(6);
      expect(transfer.tokenSymbol).toBe('STREAMS');
      expect(transfer.tokenName).toBe('Stream');
    });

    it('should parse the values to JSON correctly', () => {
      const json = transfer.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenDecimals: 6,
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        valueWithDecimals: '0.012345',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = transfer.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenDecimals: 6,
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        valueWithDecimals: '0.012345',
      });
    });
  });

  describe('No metadata', () => {
    const input = mockStreamErc20Transfer.NO_METADATA;
    let transfer: StreamErc20Transfer;

    beforeAll(() => {
      transfer = StreamErc20Transfer.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Read values
      expect(transfer.chain.hex).toBe('0x1');
      expect(transfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(transfer.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(transfer.logIndex).toBe(0);
      expect(transfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(transfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(transfer.value.toString()).toBe('12345');
      expect(transfer.valueWithDecimals).toBeUndefined();
      expect(transfer.tokenDecimals).toBeUndefined();
      expect(transfer.tokenSymbol).toBe('');
      expect(transfer.tokenName).toBe('');
    });

    it('should parse the values to JSON correctly', () => {
      const json = transfer.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenDecimals: undefined,
        tokenName: '',
        tokenSymbol: '',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        valueWithDecimals: undefined,
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = transfer.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        tokenDecimals: undefined,
        tokenName: '',
        tokenSymbol: '',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        value: '12345',
        valueWithDecimals: undefined,
      });
    });
  });

  it('should return return true for .equals() on equality match', () => {
    const input = mockStreamErc20Transfer.FULL;
    const transfer = StreamErc20Transfer.create(input, core);
    const isEqual = transfer.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return return false for .equals() on mismatching chain', () => {
    const input = mockStreamErc20Transfer.FULL;
    const transfer = StreamErc20Transfer.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      chain: '0x2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching logIndex', () => {
    const input = mockStreamErc20Transfer.FULL;
    const transfer = StreamErc20Transfer.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      logIndex: '2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching transactionHash', () => {
    const input = mockStreamErc20Transfer.FULL;
    const transfer = StreamErc20Transfer.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
    });

    expect(isEqual).toBe(false);
  });
});
