import { GetStreamsAptosResponseAdapter, GetStreamsEvmResponseAdapter } from '@moralisweb3/common-streams-utils';
import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get streams', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('aptos', () => {
    it('should get all streams', async () => {
      const result = (await StreamApi.getAll({
        limit: 20,
        networkType: 'aptos',
      })) as GetStreamsAptosResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(20);
      expect(result.result.length).toEqual(20);
      expect(result.result[0].tag).toEqual('tag-1');
    });

    it('should return all properties on the result', async () => {
      const result = (await StreamApi.getAll({
        limit: 20,
        networkType: 'aptos',
      })) as GetStreamsAptosResponseAdapter;

      const stream = result.result[0];
      expect(stream.webhookUrl).toBe('https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f');
      expect(stream.description).toBe('mock response');
      expect(stream.tag).toBe('tag-1');
      expect(stream.allAddresses).toBe(false);
      expect(stream.id).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
      expect(stream.status).toBe('paused');
      expect(stream.statusMessage).toBe('Stream was paused by the user');
      expect(stream.network.map((network) => network.network)).toStrictEqual(['mainnet', 'devnet']);
      expect(stream.demo).toBe(true);
      expect(stream.includeChanges).toBe(true);
      expect(stream.includeEvents).toBe(true);
      expect(stream.includePayload).toBe(false);
      expect(stream.events).toStrictEqual([]);
      expect(stream.functions).toStrictEqual([]);
    });
  });

  describe('evm', () => {
    it('should get all streams', async () => {
      const result = (await StreamApi.getAll({
        limit: 20,
        networkType: 'evm',
      })) as GetStreamsEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(20);
      expect(result.result.length).toEqual(20);
      expect(result.result[0].tag).toEqual('tag-1');
    });

    it('should return all properties on the result', async () => {
      const result = (await StreamApi.getAll({
        limit: 20,
        networkType: 'evm',
      })) as GetStreamsEvmResponseAdapter;

      const item = result.result[0];
      expect(item.webhookUrl).toBe('https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f');
      expect(item.description).toBe('mock response');
      expect(item.tag).toBe('tag-1');
      expect(item.topic0).toStrictEqual(['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']);
      expect(item.allAddresses).toBe(false);
      expect(item.includeNativeTxs).toBe(false);
      expect(item.includeContractLogs).toBe(false);
      expect(item.includeInternalTxs).toBe(false);
      expect(item.abi).toBeUndefined();
      expect(item.advancedOptions).toBeUndefined();
      expect(item.id).toBe('3fa85f64-5717-4562-b3fc-2c963f66afa6');
      expect(item.status).toBe('active');
      expect(item.statusMessage).toBe('Stream is active');
      expect(item.chains.map((chain) => chain.decimal)).toStrictEqual([3, 4]);
      expect(item.chainIds).toStrictEqual(['0x3', '0x4']);
    });

    it('should default to evm networkType', async () => {
      const result = (await StreamApi.getAll({
        limit: 20,
      })) as GetStreamsEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(20);
      expect(result.result.length).toEqual(20);
      expect(result.result[0].tag).toEqual('tag-1');
    });

    it('should get a cursor', async () => {
      const result = (await StreamApi.getAll({
        limit: 5,
        networkType: 'evm',
      })) as GetStreamsEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(20);
      expect(result.result.length).toEqual(5);
      expect(result.result[0].tag).toEqual('tag-2');
      expect(result.pagination.cursor).toEqual('cursor');
      expect(result.next).toBeDefined();
      expect(result.hasNext).toBeTruthy();
    });

    it('should use a provided cursor', async () => {
      const result = (await StreamApi.getAll({
        limit: 5,
        cursor: 'cursor',
        networkType: 'evm',
      })) as GetStreamsEvmResponseAdapter;

      expect(result).toBeDefined();
      expect(result.result).toBeDefined();
      expect(result.pagination.total).toEqual(20);
      expect(result.result.length).toEqual(5);
      expect(result.result[0].tag).toEqual('tag-3');
      expect(result.pagination.cursor).toEqual('cursor-2');
      expect(result.next).toBeDefined();
      expect(result.hasNext).toBeTruthy();
    });
  });
});
