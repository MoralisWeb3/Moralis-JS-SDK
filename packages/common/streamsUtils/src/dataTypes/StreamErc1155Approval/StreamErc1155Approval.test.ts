import { StreamErc1155Approval } from './StreamErc1155Approval';
import { mockStreamErc1155Approval } from './StreamErc1155Approval.mock';

const testsInputs = Object.entries(mockStreamErc1155Approval).map(([name, input]) => ({ name, input }));

describe('StreamErc1155Approval', () => {
  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const approval = StreamErc1155Approval.create(input);
    const output = approval.format();

    expect(approval).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Default', () => {
    const input = mockStreamErc1155Approval.FULL;
    let approval: StreamErc1155Approval;

    beforeAll(() => {
      approval = StreamErc1155Approval.create(input);
    });

    it('should return correct values for all getters', () => {
      expect(approval.chain.hex).toBe('0x1');
      expect(approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
      expect(approval.logIndex).toBe(0);
      expect(approval.operator.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
      expect(approval.approved).toBe(true);
      expect(approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
      expect(approval.account.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');
      expect(approval.tokenContractType).toBe('ERC1155');
      expect(approval.tokenName).toBe('Stream');
      expect(approval.tokenSymbol).toBe('STREAMS');
      expect(approval.triggers?.map((trigger) => trigger.toJSON())).toStrictEqual([
        { name: 'ownerBalance', value: '6967063534600021400000' },
        { name: 'approverBalance', value: '200000000000000000' },
      ]);
    });

    it('should parse the values to JSON correctly', () => {
      const json = approval.toJSON();
      expect(json).toStrictEqual({
        approved: true,
        chain: '0x1',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        operator: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        tokenContractType: 'ERC1155',
        account: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        triggers: [
          { name: 'ownerBalance', value: '6967063534600021400000' },
          { name: 'approverBalance', value: '200000000000000000' },
        ],
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = approval.format();

      expect(json).toStrictEqual({
        approved: true,
        chain: '0x1',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        logIndex: 0,
        operator: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
        tokenContractType: 'ERC1155',
        account: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
        tokenName: 'Stream',
        tokenSymbol: 'STREAMS',
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
        triggers: [
          { name: 'ownerBalance', value: '6967063534600021400000' },
          { name: 'approverBalance', value: '200000000000000000' },
        ],
      });
    });

    it('should return true for .equals() on equality match', () => {
      const isEqual = approval.equals({
        ...input,
      });

      expect(isEqual).toBe(true);
    });

    it('should return false for .equals() on mismatching chain', () => {
      const isEqual = approval.equals({
        ...input,
        chain: '0x2',
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching transactionHash', () => {
      const isEqual = approval.equals({
        ...input,
        transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f8',
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching account', () => {
      const isEqual = approval.equals({
        ...input,
        account: '0xee010a7476bc5adc88f1befc68c3b58f27f90410',
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching contract', () => {
      const isEqual = approval.equals({
        ...input,
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec8',
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching operator', () => {
      const isEqual = approval.equals({
        ...input,
        operator: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a6',
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching approved', () => {
      const isEqual = approval.equals({
        ...input,
        approved: false,
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching trigger results length', () => {
      const isEqual = approval.equals({
        ...input,
        triggers: [{ name: 'ownerBalance', value: '6967063534600021400000' }],
      });

      expect(isEqual).toBe(false);
    });

    it('should return false for .equals() on mismatching trigger results', () => {
      const isEqual = approval.equals({
        ...input,
        triggers: [
          { name: 'ownerBalance', value: '6967063534600021400000' },
          { name: 'approverBalance', value: '200' },
        ],
      });

      expect(isEqual).toBe(false);
    });
  });
});
