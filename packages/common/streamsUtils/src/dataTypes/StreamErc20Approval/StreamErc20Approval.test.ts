import Core from '@moralisweb3/common-core';
import { setupStreamsUtils } from '../../test/setup';
import { StreamErc20Approval } from './StreamErc20Approval';
import { mockStreamErc20Approval } from './StreamErc20Approval.mock';

const testsInputs = Object.entries(mockStreamErc20Approval).map(([name, input]) => ({ name, input }));

describe('StreamErc20Approval', () => {
  let core: Core;

  beforeAll(() => {
    core = setupStreamsUtils();
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
      expect(approval.triggers?.map(t => t.toJSON())).toStrictEqual([
        { name: "ownerBalance", value: "6967063534600021400000" },
        { name: "spenderBalance", value: "200000000000000000" },
      ]);
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
        triggers: [
          { name: "ownerBalance", value: "6967063534600021400000" },
          { name: "spenderBalance", value: "200000000000000000" },
        ],
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
        triggers: [
          { name: "ownerBalance", value: "6967063534600021400000" },
          { name: "spenderBalance", value: "200000000000000000" },
        ],
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
      expect(approval.triggers).toBeUndefined();
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
        triggers: undefined,
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
        triggers: undefined,
      });
    });
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatching chain', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      chain: '0x2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching logIndex', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      logIndex: '2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching transactionHash', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching trigger results length', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      triggers: [
        { name: "ownerBalance", value: "6967063534600021400000" },
      ],
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching trigger results', () => {
    const input = mockStreamErc20Approval.FULL;
    const transfer = StreamErc20Approval.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      triggers: [
        { name: "ownerBalance", value: "6967063534600021400000" },
        { name: "spenderBalance", value: "200" },
      ],
    });

    expect(isEqual).toBe(false);
  });
});
