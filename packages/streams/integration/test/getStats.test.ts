import { MoralisStreams } from '../../src/MoralisStreams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Get stats', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should get streams stats ', async () => {
    const result = await StreamApi.getStats();

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.totalLogsProcessed).toEqual(2);
    expect(result.result.totalTxsInternalProcessed).toEqual(0);
    expect(result.result.totalTxsProcessed).toEqual(1);
    expect(result.result.totalWebhooksDelivered).toEqual(0);
  });
});
