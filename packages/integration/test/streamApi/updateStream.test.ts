import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('Update stream', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should update a stream ', async () => {
    const result = await StreamApi.update({
      chains: ['0x3'],
      tag: 'test',
      description: 'test',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      id: 'VALID_REQUEST',
      networkType: 'evm',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.chainIds).toContain('0x3');
  });

  it('should default to evm networkType', async () => {
    const result = await StreamApi.update({
      chains: ['0x3'],
      tag: 'test',
      description: 'test',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.chainIds).toContain('0x3');
  });

  it('should not update stream', async () => {
    const failedResult = await StreamApi.update({
      chains: ['0x3'],
      tag: 'test',
      description: 'test',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      networkType: 'evm',
    })
      .then()
      .catch((err: any) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      StreamApi.update({
        chains: ['invalid_chain'],
        tag: 'test',
        description: 'test',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        networkType: 'evm',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });
});
