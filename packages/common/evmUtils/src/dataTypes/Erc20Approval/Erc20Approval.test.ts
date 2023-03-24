import { Core } from '@moralisweb3/common-core';
import { Erc20Approval } from './Erc20Approval';
import { setupEvmUtils } from '../../test/setup';
import { Erc20ApprovalInput } from './types';

const exampleInput: Erc20ApprovalInput = {
  chain: '0x1',
  toWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
  fromWallet: '0xaabc2c22426993f3d219d94a5ee6e95d4954f3bf',
  contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
  blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
  blockNumber: '16868690',
  blockTimestamp: '2023-03-20T11:48:59.000Z',
  transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
  transactionIndex: 4,
  logIndex: 25,
  possibleSpam: false,
  value: '100000000000000000000000000000',
};

describe('Erc20Approval', () => {
  let core: Core;

  beforeAll(() => {
    core = setupEvmUtils();
  });

  beforeEach(() => {
    core.config.reset();
  });

  /**
   * Creation
   */
  it('should create a new Erc20Approval', () => {
    const erc20Approval = Erc20Approval.create(exampleInput);

    expect(erc20Approval.chain.hex).toBe('0x1');
    expect(erc20Approval.toWallet.lowercase).toBe('0x09f4fc6081026c85070886599e83f599ecf82405');
    expect(erc20Approval.fromWallet.lowercase).toBe('0xaabc2c22426993f3d219d94a5ee6e95d4954f3bf');
    expect(erc20Approval.contractAddress.lowercase).toBe('0xa0e8fed3426391fdb446516799c4d6248e2b2860');
    expect(erc20Approval.blockNumber.toString()).toBe('16868690');
    expect(erc20Approval.blockTimestamp.toISOString()).toBe('2023-03-20T11:48:59.000Z');
    expect(erc20Approval.transactionHash).toBe('0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf');
    expect(erc20Approval.transactionIndex).toBe(4);
    expect(erc20Approval.logIndex).toBe(25);
    expect(erc20Approval.possibleSpam).toBe(false);
    expect(erc20Approval.value.toString()).toBe('100000000000000000000000000000');
  });

  /**
   * Formatting
   */
  it('should return formatting in json', () => {
    const erc20Approval = Erc20Approval.create(exampleInput);

    const value = erc20Approval.toJSON();

    expect(value).toStrictEqual({
      chain: '0x1',
      toWallet: '0x09f4fc6081026c85070886599e83f599ecf82405',
      fromWallet: '0xaabc2c22426993f3d219d94a5ee6e95d4954f3bf',
      contractAddress: '0xa0e8fed3426391fdb446516799c4d6248e2b2860',
      blockHash: '0xa5f87d4341642b89e3ccb81449e3083032c36fface2c2042941b8bd9afe83f79',
      blockNumber: '16868690',
      blockTimestamp: new Date('2023-03-20T11:48:59.000Z'),
      transactionHash: '0xb7b4d321e2ab26c1cde1a2ef49413e21b65dcc663d6de8f75ddbdd868b98b4bf',
      transactionIndex: 4,
      logIndex: 25,
      possibleSpam: false,
      value: '100000000000000000000000000000',
    });
  });

  /**
   * Methods
   */
  it('should check equality of 2 erc20Approvals of the same value', () => {
    const erc20ApprovalA = Erc20Approval.create(exampleInput);
    const erc20ApprovalB = Erc20Approval.create(exampleInput);

    expect(erc20ApprovalA.equals(erc20ApprovalB)).toBeTruthy();
  });

  it('should check equality of 2 erc20Approvals of the same value via a static method', () => {
    const erc20ApprovalA = Erc20Approval.create(exampleInput);
    const erc20ApprovalB = Erc20Approval.create(exampleInput);

    expect(Erc20Approval.equals(erc20ApprovalA, erc20ApprovalB)).toBeTruthy();
  });

  it('should check inequality when chain is different', () => {
    const erc20ApprovalA = Erc20Approval.create(exampleInput);
    const erc20ApprovalB = Erc20Approval.create({ ...exampleInput, chain: '0x2' });

    expect(erc20ApprovalA.equals(erc20ApprovalB)).toBeFalsy();
  });
});
