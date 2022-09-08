import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('Create stream', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should create a stream ', async () => {
    const result = await StreamApi.add({
      chainId: '0x3',
      address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
      tag: 'test',
      description: 'test',
      type: 'tx',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.result.chainId).toEqual('0x3');
    expect(result.result.type).toEqual('tx');
  });

  it('should not create stream', async () => {
    const failedResult = await StreamApi.add({
      chainId: 'invalid_chain',
      address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
      tag: 'test',
      description: 'test',
      type: 'tx',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
    })
      .then()
      .catch((err: any) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      StreamApi.add({
        chainId: 'invalid_chain',
        address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
        tag: 'test',
        description: 'test',
        type: 'tx',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });
});
