import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamErc20Approval } from './StreamErc20Approval';
import { StreamErc20ApprovalInput } from './types';

const mockErc20Approval: StreamErc20ApprovalInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  tag: 'test-tag',
  owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  token: {
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'Stream',
    symbol: 'STREAMS',
    decimals: 6,
  },
};

describe('StreamErc20Approval', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it('should create a new StreamErc20Approval succesfully', () => {
    const erc20Approval = StreamErc20Approval.create(mockErc20Approval, core);

    // Read values
    expect(erc20Approval.chain.decimal).toBe(1);
    expect(erc20Approval.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
    expect(erc20Approval.logIndex).toBe(0);
    expect(erc20Approval.tag).toBe('test-tag');
    expect(erc20Approval.owner.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
    expect(erc20Approval.spender.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');

    // Values
    expect(erc20Approval.valueWithDecimals).toBe('0.012345');
    expect(erc20Approval.value).toBe('12345');
    expect(erc20Approval.amount.toString()).toBe('12345');
    // Note that the tokenValue.value and value is not the same, this is on purpose to keep this class consistent with the returntype of the api
    expect(erc20Approval.tokenValue.value).toBe('0.012345');
    expect(erc20Approval.tokenValue.amount.toString()).toBe('12345');

    // Token metadata (via token. lookups and direct lookups)
    expect(erc20Approval.token.contractAddress.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(erc20Approval.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(erc20Approval.token.name).toBe('Stream');
    expect(erc20Approval.tokenName).toBe('Stream');
    expect(erc20Approval.token.symbol).toBe('STREAMS');
    expect(erc20Approval.tokenSymbol).toBe('STREAMS');
    expect(erc20Approval.token.decimals).toBe(6);
    expect(erc20Approval.tokenDecimals).toBe(6);
  });

  it('should parse the values to JSON correctly', () => {
    const erc20Approval = StreamErc20Approval.create(mockErc20Approval, core);

    expect(erc20Approval.toJSON()).toStrictEqual({
      chain: '0x1',
      logIndex: 0,
      owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
      tag: 'test-tag',
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
    const erc20Approval = StreamErc20Approval.create(mockErc20Approval, core);

    expect(erc20Approval.format()).toStrictEqual({
      chain: '0x1',
      logIndex: 0,
      owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
      tag: 'test-tag',
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
