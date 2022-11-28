import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get stream', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should get all streams', async () => {
    const result = await StreamApi.getAll({
      limit: 20,
      networkType: 'evm',
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(20);
    expect(result.result[0].tag).toEqual('tag-1');
  });

  it('should return all properties on the result', async () => {
    const result = await StreamApi.getAll({
      limit: 20,
      networkType: 'evm',
    });

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
    const result = await StreamApi.getAll({
      limit: 20,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(20);
    expect(result.result[0].tag).toEqual('tag-1');
  });

  it('should get a cursor', async () => {
    const result = await StreamApi.getAll({
      limit: 5,
      networkType: 'evm',
    });

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
    const result = await StreamApi.getAll({
      limit: 5,
      cursor: 'cursor',
      networkType: 'evm',
    });

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
