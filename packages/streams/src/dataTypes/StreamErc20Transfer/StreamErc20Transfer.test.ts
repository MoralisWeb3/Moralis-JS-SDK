import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamErc20Transfer } from './StreamErc20Transfer';
import { StreamErc20TransferInput } from './types';

const mockErc20Transfer: StreamErc20TransferInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  tag: 'test-tag',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  token: {
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    name: 'Stream',
    symbol: 'STREAMS',
    decimals: 6,
  },
};

describe('StreamErc20Transfer', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it('should create a new StreamErc20Transfer succesfully', () => {
    const erc20Transfer = StreamErc20Transfer.create(mockErc20Transfer, core);

    // Read values
    expect(erc20Transfer.chain.decimal).toBe(1);
    expect(erc20Transfer.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
    expect(erc20Transfer.logIndex).toBe(0);
    expect(erc20Transfer.tag).toBe('test-tag');
    expect(erc20Transfer.from.lowercase).toBe('0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5');
    expect(erc20Transfer.to.lowercase).toBe('0xee010a7476bc5adc88f1befc68c3b58f27f90419');

    // Values
    expect(erc20Transfer.valueWithDecimals).toBe('0.012345');
    expect(erc20Transfer.value).toBe('12345');
    expect(erc20Transfer.amount.toString()).toBe('12345');
    // Note that the tokenValue.value and value is not the same, this is on purpose to keep this class consistent with the returntype of the api
    expect(erc20Transfer.tokenValue.value).toBe('0.012345');
    expect(erc20Transfer.tokenValue.amount.toString()).toBe('12345');

    // Token metadata (via token. lookups and direct lookups)
    expect(erc20Transfer.token.contractAddress.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(erc20Transfer.contract.lowercase).toBe('0xdac17f958d2ee523a2206206994597c13d831ec7');
    expect(erc20Transfer.token.name).toBe('Stream');
    expect(erc20Transfer.tokenName).toBe('Stream');
    expect(erc20Transfer.token.symbol).toBe('STREAMS');
    expect(erc20Transfer.tokenSymbol).toBe('STREAMS');
    expect(erc20Transfer.token.decimals).toBe(6);
    expect(erc20Transfer.tokenDecimals).toBe(6);
  });

  it('should parse the values to JSON correctly', () => {
    const erc20Transfer = StreamErc20Transfer.create(mockErc20Transfer, core);

    expect(erc20Transfer.toJSON()).toStrictEqual({
      chain: '0x1',
      logIndex: 0,
      from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
    const erc20Transfer = StreamErc20Transfer.create(mockErc20Transfer, core);

    expect(erc20Transfer.format()).toStrictEqual({
      chain: '0x1',
      logIndex: 0,
      from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
      to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
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
