import { UpdateStreamAptosResponseAdapter, UpdateStreamEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Update stream', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should update a stream ', async () => {
      const result = (await StreamApi.update({
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
        networkType: 'aptos',
      })) as UpdateStreamAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.result.tag).toEqual('test-1');
    });

    it('should throw an error on invalid network', async () => {
      const failedResult = await StreamApi.update({
        network: ['INVALID'],
        tag: 'test',
        description: 'test',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        networkType: 'aptos',
      })
        .then()
        .catch((err: any) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        StreamApi.update({
          network: ['INVALID'],
          tag: 'test',
          description: 'test',
          webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          networkType: 'aptos',
        }),
      ).rejects.toThrowError(`[C0005] Aptos network is not supported: INVALID`);
    });

    it('should throw an error when invalid webhook is provided', async () => {
      expect(
        StreamApi.update({
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
    it('should update a stream ', async () => {
      const result = (await StreamApi.update({
        chains: ['0x3'],
        tag: 'test-1',
        description: 'Valid request',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: 'VALID_REQUEST',
        networkType: 'evm',
      })) as UpdateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.result.tag).toEqual('test-1');
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.update({
        chains: ['0x3'],
        tag: 'test-1',
        description: 'Valid request',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: 'VALID_REQUEST',
      })) as UpdateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result).toEqual(expect.objectContaining({}));
      expect(result.result.tag).toEqual('test-1');
    });

    it('should throw an error on invalid chain', async () => {
      const failedResult = await StreamApi.update({
        chains: ['0x3'],
        tag: 'test',
        description: 'test',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        networkType: 'evm',
      })
        .then()
        .catch((err: any) => {
          return err;
        });

      expect(failedResult).toBeDefined();
      expect(
        StreamApi.update({
          chains: ['invalid_chain'],
          tag: 'test',
          description: 'test',
          webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          networkType: 'evm',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
      );
    });

    it('should update a stream with all provided params', async () => {
      const result = (await StreamApi.update({
        id: 'VALID_FULL_REQUEST',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        description: 'Body with all params filled',
        tag: 'test-2',
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
      })) as UpdateStreamEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result.tag).toEqual('test-2');
    });

    it('should throw an error when invalid webhook is provided', async () => {
      expect(
        StreamApi.update({
          id: 'INVALID_WEBHOOK',
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
