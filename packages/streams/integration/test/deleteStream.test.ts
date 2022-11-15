import { Streams } from '../../src/Streams';
import { cleanStreamsApi, setupStreamApi } from '../setup';

describe('Delete stream', () => {
  let StreamApi: Streams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should delete a stream ', async () => {
    const result = await StreamApi.delete({
      id: 'VALID_RESPONSE',
      networkType: 'evm',
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toContain('valid-response');
  });

  it('should default to evm networkType', async () => {
    const result = await StreamApi.delete({
      id: 'VALID_RESPONSE',
    });

    expect(result).toBeDefined();
    expect(result.result.tag).toContain('valid-response');
  });

  it('should throw an error on non-found stream', async () => {
    expect(
      StreamApi.delete({
        id: 'STREAM_NOT_FOUND',
      }),
    ).rejects.toThrowError('[C0006] Request failed, Not Found(404): Stream not found');
  });
});
