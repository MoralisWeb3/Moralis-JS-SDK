import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('getLogs', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should get all logs', async () => {
    const result = await StreamApi.getLogs({
      limit: 20,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(20);
    expect(result.result[0].id).toEqual('logs-test-id-1');
  });

  it('should get a cursor', async () => {
    const result = await StreamApi.getLogs({
      limit: 5,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(5);
    expect(result.result[0].id).toEqual('logs-test-id-2');
    expect(result.pagination.cursor).toEqual('cursor');
    expect(result.next).toBeDefined();
    expect(result.hasNext).toBeTruthy();
  });

  it('should use a provided cursor', async () => {
    const result = await StreamApi.getLogs({
      limit: 5,
      cursor: 'cursor',
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result.length).toEqual(5);
    expect(result.result[0].id).toEqual('logs-test-id-3');
    expect(result.pagination.cursor).toEqual('cursor-2');
    expect(result.next).toBeDefined();
    expect(result.hasNext).toBeTruthy();
  });
});
