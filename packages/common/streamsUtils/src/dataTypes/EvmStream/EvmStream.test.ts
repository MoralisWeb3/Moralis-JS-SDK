import { EvmStream } from './EvmStream';
import { mockEvmStream } from './EvmStream.mock';

const testsInputs = Object.entries(mockEvmStream).map(([name, input]) => ({ name, input }));

describe('EvmStream', () => {
  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const stream = EvmStream.create(input);
    const output = stream.format();

    expect(stream).toBeDefined();
    expect(output).toBeDefined();
  });

  describe('Simple', () => {
    const input = mockEvmStream.SIMPLE;
    let stream: EvmStream;

    beforeAll(() => {
      stream = EvmStream.create(input);
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
      expect(stream.includeAllTxLogs).toBe(false);
      expect(stream.abi).toBeUndefined();
      expect(stream.advancedOptions).toBeUndefined();
      expect(stream.id).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
      expect(stream.status).toBe('active');
      expect(stream.statusMessage).toBe('Stream is active');
      expect(stream.chains.map((chain) => chain.decimal)).toStrictEqual([3, 4]);
      expect(stream.chainIds).toStrictEqual(['0x3', '0x4']);
      expect(stream.triggers!.map((trigger) => trigger.toJSON())).toStrictEqual([
        {
          type: 'erc20transfer',
          contractAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          functionAbi: {},
          inputs: ['$to'],
          callFrom: undefined,
        },
      ]);
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
        includeAllTxLogs: false,
        includeNativeTxs: false,
        getNativeBalances: undefined,
        status: 'active',
        statusMessage: 'Stream is active',
        tag: 'tag',
        topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
        triggers: [
          {
            type: 'erc20transfer',
            contractAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
            functionAbi: {},
            inputs: ['$to'],
            callFrom: undefined,
          },
        ],
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
        includeAllTxLogs: false,
        includeNativeTxs: false,
        status: 'active',
        statusMessage: 'Stream is active',
        tag: 'tag',
        topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
        getNativeBalances: undefined,
        triggers: [
          {
            type: 'erc20transfer',
            contractAddress: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
            functionAbi: {},
            inputs: ['$to'],
            callFrom: undefined,
          },
        ],
      });
    });
  });

  describe('Advanced options', () => {
    const input = mockEvmStream.ADVANCED_OPTIONS;
    let stream: EvmStream;

    beforeAll(() => {
      stream = EvmStream.create(input);
    });

    it('should return correct values advancedOptions getter', () => {
      expect(stream.advancedOptions).toStrictEqual([
        {
          topic0: 'Transfer(address,address,uint256)',
          filter: {
            eq: ['tokenId', '1'],
          },
          includeNativeTxs: true,
        },
      ]);
    });

    it('should parse the values to JSON correctly', () => {
      const json = stream.toJSON();

      expect(json.advancedOptions).toStrictEqual([
        {
          topic0: 'Transfer(address,address,uint256)',
          filter: {
            eq: ['tokenId', '1'],
          },
          includeNativeTxs: true,
        },
      ]);
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = stream.format();

      expect(json.advancedOptions).toStrictEqual([
        {
          topic0: 'Transfer(address,address,uint256)',
          filter: {
            eq: ['tokenId', '1'],
          },
          includeNativeTxs: true,
        },
      ]);
    });
  });

  describe('GetNativeBalances', () => {
    const input = mockEvmStream.GET_NATIVE_BALANCES;
    let stream: EvmStream;

    beforeAll(() => {
      stream = EvmStream.create(input);
    });

    it('should return correct values for getNativeBalances getter', () => {
      expect(stream.getNativeBalances).toStrictEqual([
        {
          selectors: ['$fromAddress', '$toAddress'],
          type: 'tx',
        },
      ]);
    });

    it('should parse the values to JSON correctly', () => {
      const json = stream.toJSON();

      expect(json.getNativeBalances).toStrictEqual([
        {
          selectors: ['$fromAddress', '$toAddress'],
          type: 'tx',
        },
      ]);
    });

    it('should parse the values to a JSON on format() correctly', () => {
      const json = stream.format();

      expect(json.getNativeBalances).toStrictEqual([
        {
          selectors: ['$fromAddress', '$toAddress'],
          type: 'tx',
        },
      ]);
    });
  });

  it('should return true for .equals() on equality match', () => {
    const input = mockEvmStream.SIMPLE;
    const transfer = EvmStream.create(input);
    const isEqual = transfer.equals({
      ...input,
    });

    expect(isEqual).toBe(true);
  });

  it('should return false for .equals() on mismatching id', () => {
    const input = mockEvmStream.SIMPLE;
    const transfer = EvmStream.create(input);
    const isEqual = transfer.equals({
      ...input,
      id: '3fa85f64-5717-4562-b3fc-2c963f66afax',
    });

    expect(isEqual).toBe(false);
  });

  it('should return false for .equals() on mismatching triggers', () => {
    const input = mockEvmStream.SIMPLE;
    const transfer = EvmStream.create(input);
    const isEqual = transfer.equals({
      ...input,
      triggers: undefined,
    });

    expect(isEqual).toBe(false);
  });
});
