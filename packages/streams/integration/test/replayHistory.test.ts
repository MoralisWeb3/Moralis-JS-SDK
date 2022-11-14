import { MoralisStreams } from '../../src/MoralisStreams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('replayHistory', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  describe('evm', () => {
    it('should trigger replay history succesfully', async () => {
      const result = await StreamApi.retry({
        id: 'id-1',
        streamId: 'stream-1',
      });

      expect(result).toBeDefined();
      expect(result.result.id).toBe('stream-1');
    });

    it('should throw an error when no history is found', async () => {
      expect(
        StreamApi.retry({
          id: 'not-found',
          streamId: 'stream-1',
        }),
      ).rejects.toThrowError('[C0006] Request failed, Not Found(404): History not found');
    });
  });
});
