import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get stats by ID', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should get streams stats by ID', async () => {
    const result = await StreamApi.getStatsById({
      streamId: 'stream-1',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.totalLogsProcessed).toEqual(2);
    expect(result.result.totalTxsInternalProcessed).toEqual(0);
    expect(result.result.totalTxsProcessed).toEqual(1);
    expect(result.result.totalWebhooksDelivered).toEqual(0);
  });

  it('should throw an error when streamId is not found', async () => {
    expect(
      StreamApi.getStatsById({
        streamId: 'not-found',
      }),
    ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stat not found');
  });
});
