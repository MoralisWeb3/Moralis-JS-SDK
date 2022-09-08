import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('Delete stream', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should delete a stream ', async () => {
    const result = await StreamApi.delete({
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.chainIds).toContain('0x3');
    expect(result.result.type).toEqual('wallet');
  });
});
