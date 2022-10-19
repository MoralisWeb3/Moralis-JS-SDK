import { MoralisStreams } from '../../src/MoralisStreams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get stream', () => {
  let StreamApi: MoralisStreams;

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
