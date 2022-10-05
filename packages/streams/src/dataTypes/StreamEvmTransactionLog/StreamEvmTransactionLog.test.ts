import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { StreamEvmTransactionLog, StreamEvmTransactionLogInput } from './StreamEvmTransactionLog';

const mockErc721Approval: StreamEvmTransactionLogInput = {
  chain: '0x1',
  address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  topic0: '0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03',
  topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
  data: '0x0020fe349a7800fd5eeaaf755446f4f7412b84f8d46f1165b182e5b5bb67e176',
  logIndex: '0',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  tag: 'test-tag',
  streamId: 'stream-id',
};

describe('StreamEvmTransactionLog', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it('should create a new StreamEvmTransactionLog succesfully', () => {
    const transactionLog = StreamEvmTransactionLog.create(mockErc721Approval, core);

    expect(transactionLog.chain.decimal).toBe(1);
    expect(transactionLog.transactionHash).toBe('0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7');
    expect(transactionLog.logIndex).toBe(0);
    expect(transactionLog.tag).toBe('test-tag');
    expect(transactionLog.streamId).toBe('stream-id');
    expect(transactionLog.topic0).toBe('0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03');
    expect(transactionLog.topic1).toBe('0x0000000000000000000000000000000000000000000000000000000000000000');
    expect(transactionLog.topic2).toBeUndefined();
    expect(transactionLog.topic3).toBeUndefined();
    expect(transactionLog.topics).toStrictEqual([
      '0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ]);
  });

  it('should parse the values to JSON correctly', () => {
    const transactionLog = StreamEvmTransactionLog.create(mockErc721Approval, core);

    expect(transactionLog.toJSON()).toStrictEqual({
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      block: undefined,
      chain: '0x1',
      data: '0x0020fe349a7800fd5eeaaf755446f4f7412b84f8d46f1165b182e5b5bb67e176',
      logIndex: 0,
      streamId: 'stream-id',
      tag: 'test-tag',
      topic0: '0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03',
      topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
      topic2: undefined,
      topic3: undefined,
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      transactionIndex: undefined,
    });
  });

  it('should parse the values to a JSON on format() correctly', () => {
    const transactionLog = StreamEvmTransactionLog.create(mockErc721Approval, core);

    expect(transactionLog.toJSON()).toStrictEqual({
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      block: undefined,
      chain: '0x1',
      data: '0x0020fe349a7800fd5eeaaf755446f4f7412b84f8d46f1165b182e5b5bb67e176',
      logIndex: 0,
      streamId: 'stream-id',
      tag: 'test-tag',
      topic0: '0xdde371250dcd21c331edbb965b9163f4898566e8c60e28868533281edf66ab03',
      topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
      topic2: undefined,
      topic3: undefined,
      transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
      transactionIndex: undefined,
    });
  });
});
