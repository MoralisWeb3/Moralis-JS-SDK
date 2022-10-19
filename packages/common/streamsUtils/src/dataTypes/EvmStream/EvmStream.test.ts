import MoralisCore from '@moralisweb3/core';
import { setupStreamsUtils } from '../../test/setup';
import { EvmStream } from './EvmStream';
import { mockEvmStream } from './EvmStream.mock';

const testsInputs = Object.entries(mockEvmStream).map(([name, input]) => ({ name, input }));

describe('EvmStream', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreamsUtils();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const stream = EvmStream.create(input, core);
    const output = stream.format();

    expect(stream).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Simple', () => {
    const input = mockEvmStream.SIMPLE;
    let stream: EvmStream;

    beforeAll(() => {
      stream = EvmStream.create(input, core);
    });

    it('should return correct values for all getters', () => {
      expect(stream.webhookUrl).toBe('https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f');
      expect(stream.description).toBe('mock response');
      expect(stream.tag).toBe('tag');
      expect(stream.topic0).toStrictEqual(['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']);
      expect(stream.allAddresses).toBe(false);
      expect(stream.includeNativeTxs).toBe(false);
      expect(stream.includeContractLogs).toBe(false);
      expect(stream.includeInternalTxs).toBe(false);
      expect(stream.abi).toBeUndefined();
      expect(stream.advancedOptions).toBeUndefined();
      expect(stream.id).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
      expect(stream.status).toBe('active');
      expect(stream.statusMessage).toBe('Stream is active');
      expect(stream.chains.map((chain) => chain.decimal)).toStrictEqual([3, 4]);
      expect(stream.chainIds).toStrictEqual(['0x3', '0x4']);
    });

    it('should parse the values to JSON correctly', () => {
      const json = stream.toJSON();

      expect(json).toStrictEqual({
        abi: undefined,
        advancedOptions: undefined,
        allAddresses: false,
        chainIds: ['0x3', '0x4'],
        description: 'mock response',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        includeContractLogs: false,
        includeInternalTxs: false,
        includeNativeTxs: false,
        status: 'active',
        statusMessage: 'Stream is active',
        tag: 'tag',
        topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      });
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = stream.format();

      expect(json).toStrictEqual({
        abi: undefined,
        advancedOptions: undefined,
        allAddresses: false,
        chainIds: ['0x3', '0x4'],
        description: 'mock response',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        includeContractLogs: false,
        includeInternalTxs: false,
        includeNativeTxs: false,
        status: 'active',
        statusMessage: 'Stream is active',
        tag: 'tag',
        topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      });
    });
  });

  it('should return return true for .equals() on equality match', () => {
    const input = mockEvmStream.SIMPLE;
    const transfer = EvmStream.create(input, core);
    const isEqual = transfer.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return return false for .equals() on mismatching id', () => {
    const input = mockEvmStream.SIMPLE;
    const transfer = EvmStream.create(input, core);
    const isEqual = transfer.equals({
      ...input,
      id: '3fa85f64-5717-4562-b3fc-2c963f66afax',
    });

    expect(isEqual).toBe(false);
  });
});
