import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('getHistory', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should get all streams', async () => {
    const result = await StreamApi.getHistory({
      limit: 20,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(20);
    expect(result.result[0].id).toEqual('id-1');
  });

  it('should get a cursor', async () => {
    const result = await StreamApi.getHistory({
      limit: 5,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(5);
    expect(result.result[0].id).toEqual('id-2');
    expect(result.pagination.cursor).toEqual('cursor');
    expect(result.next).toBeDefined();
    expect(result.hasNext).toBeTruthy();
  });

  it('should use a provided cursor', async () => {
    const result = await StreamApi.getHistory({
      limit: 5,
      cursor: 'cursor',
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(5);
    expect(result.result[0].id).toEqual('id-3');
    expect(result.pagination.cursor).toEqual('cursor-2');
    expect(result.next).toBeDefined();
    expect(result.hasNext).toBeTruthy();
  });
});
