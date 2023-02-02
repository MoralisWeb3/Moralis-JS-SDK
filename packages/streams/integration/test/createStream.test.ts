import { CreateStreamAptosResponseAdapter, CreateStreamEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Create stream', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should create a stream ', async () => {
      const result = (await StreamApi.add({
        networkType: 'aptos',
        allAddresses: false,
        demo: true,
        includeChanges: true,
        includeEvents: true,
        includePayload: false,
        network: ['mainnet', 'devnet'],
        events: [],
        functions: [],
        tag: 'test-1',
        description: 'mock response',
        webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
      })) as CreateStreamAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-1');
    });

    it('should throw an error when invalid network is provided', async () => {
      expect(
        StreamApi.add({
          networkType: 'aptos',
          allAddresses: false,
          demo: true,
          includeChanges: true,
          includeEvents: true,
          includePayload: false,
          network: ['INVALID'],
          events: [],
          functions: [],
          tag: 'test-1',
          description: 'mock response',
          webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
        }),
      ).rejects.toThrowError(`[C0005] Aptos network is not supported: INVALID`);
    });

    it('should throw an error when invalid webhook is provided', async () => {
      expect(
        StreamApi.add({
          networkType: 'aptos',
          allAddresses: false,
          demo: true,
          includeChanges: true,
          includeEvents: true,
          includePayload: false,
          network: ['mainnet', 'devnet'],
          events: [],
          functions: [],
          tag: 'test-1',
          description: 'mock response',
          webhookUrl: 'https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        }),
      ).rejects.toThrowError(
        `[C0006] Request failed, Bad Request(400): Could not POST to https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Please check your webhook URL.`,
      );
    });
  });

  describe('evm', () => {
    it('should create a stream ', async () => {
      const result = (await StreamApi.add({
        chains: ['0x3'],
        tag: 'test-1',
        description: 'Minimal body that works',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        networkType: 'evm',
        includeNativeTxs: true,
      })) as CreateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-1');
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.add({
        chains: ['0x3'],
        tag: 'test-1',
        description: 'Minimal body that works',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        includeNativeTxs: true,
      })) as CreateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-1');
    });

    it('should create a stream with advanced options', async () => {
      const result = (await StreamApi.add({
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body With advanced options',
        tag: 'test-2',
        chains: ['0x3'],
        advancedOptions: [
          {
            topic0: 'SomeEvent(address,uint256)',
            filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
            includeNativeTxs: true,
          },
        ],
        topic0: ['SomeEvent(address,uint256)'],
      })) as CreateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-2');
    });

    it('should create a stream with getNativeBalances', async () => {
      const result = (await StreamApi.add({
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body With getNativeBalances',
        tag: 'test-4',
        chains: ['0x3'],
        includeNativeTxs: true,
        getNativeBalances: [
          {
            selectors: ['$fromAddress', '$toAddress'],
            type: 'tx',
          },
        ],
      })) as CreateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-4');
    });

    it('should create a stream with all provided params', async () => {
      const result = (await StreamApi.add({
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body with all params filled',
        tag: 'test-3',
        topic0: ['SomeEvent(address,uint256)'],
        chains: ['0x3'],
        networkType: 'evm',
        advancedOptions: [
          {
            topic0: 'SomeEvent(address,uint256)',
            filter: { eq: ['myCoolTopic', '0x0000000000000000000000000000000000000000'] },
            includeNativeTxs: true,
          },
        ],
        abi: [],
        allAddresses: true,
        includeContractLogs: true,
        includeInternalTxs: true,
        includeNativeTxs: true,
      })) as CreateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-3');
    });

    it('should throw an error when invalid chainId is provided', async () => {
      expect(
        StreamApi.add({
          chains: ['invalid_chain'],
          tag: 'test',
          description: 'test',
          webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
          networkType: 'evm',
        }),
      ).rejects.toThrowError(
        `[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'`,
      );
    });

    it('should throw an error when invalid webhook is provided', async () => {
      expect(
        StreamApi.add({
          chains: ['0x3'],
          tag: 'test-3',
          description: 'test',
          webhookUrl: 'https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
          networkType: 'evm',
        }),
      ).rejects.toThrowError(
        `[C0006] Request failed, Bad Request(400): Could not POST to https://webhook.site/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. Please check your webhook URL.`,
      );
    });
  });
});
