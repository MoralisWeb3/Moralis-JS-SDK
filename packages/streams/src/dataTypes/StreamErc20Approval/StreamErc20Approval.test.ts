import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamErc20Approval } from './StreamErc20Approval';
import { mockStreamErc20Approval } from './StreamErc20Approval.mock';

const testsInputs = Object.entries(mockStreamErc20Approval).map(([name, input]) => ({ name, input }));

describe('StreamErc20Approval', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const approval = StreamErc20Approval.create(input, core);
    const output = approval.format();

    expect(approval).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Full', () => {
    const input = mockStreamErc20Approval.FULL;
    let approval: StreamErc20Approval;

    beforeAll(() => {
      approval = StreamErc20Approval.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Read values
      expect(approval.chain.hex).toBe('0x1');
      expect(approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(approval.logIndex).toBe(0);
      expect(approval.owner.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(approval.spender.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(approval.value.toString()).toBe('12345');
      expect(approval.valueWithDecimals).toBe('0.012345');
      expect(approval.tokenDecimals).toBe(6);
      expect(approval.tokenSymbol).toBe('STREAMS');
      expect(approval.tokenName).toBe('Stream');
    });

    it('should parse the values to JSON correctly', () => {
      const json = approval.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
      const json = approval.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
    const input = mockStreamErc20Approval.NO_METADATA;
    let approval: StreamErc20Approval;

    beforeAll(() => {
      approval = StreamErc20Approval.create(input, core);
    });

    it('should return correct values for all getters', () => {
      // Read values
      expect(approval.chain.hex).toBe('0x1');
      expect(approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(approval.logIndex).toBe(0);
      expect(approval.owner.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(approval.spender.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(approval.value.toString()).toBe('12345');
      expect(approval.valueWithDecimals).toBeUndefined();
      expect(approval.tokenDecimals).toBeUndefined();
      expect(approval.tokenSymbol).toBe('');
      expect(approval.tokenName).toBe('');
    });

    it('should parse the values to JSON correctly', () => {
      const json = approval.toJSON();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
      const json = approval.format();

      expect(json).toStrictEqual({
        chain: '0x1',
        logIndex: 0,
        owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
});
