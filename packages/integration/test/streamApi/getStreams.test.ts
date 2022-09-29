import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

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
    expect(result.result[0].chainIds).toContain('0x3');
    expect(result.result[0].type).toEqual('wallet');
  });

  it('should default to evm networkType', async () => {
    const result = await StreamApi.getAll({
      limit: 20,
    });

    expect(result).toBeDefined();
    expect(result.result).toBeDefined();
    expect(result.pagination.total).toEqual(20);
    expect(result.result[0].chainIds).toContain('0x3');
    expect(result.result[0].type).toEqual('wallet');
  });
});
