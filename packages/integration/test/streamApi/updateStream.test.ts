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

  // it('should update a stream ', async () => {
  //   const result = await StreamApi.update({
  //     chains: ['0x3'],
  //     address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
  //     tag: 'test',
  //     description: 'test',
  //     type: 'wallet',
  //     webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
  //     id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   });

  //   expect(result).toBeDefined();
  //   expect(result).toEqual(expect.objectContaining({}));
  //   expect(result.result.chainIds).toContain('0x3');
  //   expect(result.result.type).toEqual('wallet');
  // });

  it('should not update stream', async () => {
    const failedResult = await StreamApi.update({
      chains: ['0x3'],
      address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
      tag: 'test',
      description: 'test',
      type: 'wallet',
      webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      network: 'evm',
    })
      .then()
      .catch((err: any) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      StreamApi.update({
        chains: ['invalid_chain'],
        address: '0x992eCcC191D6F74E8Be187ed6B6AC196b08314f7',
        tag: 'test',
        description: 'test',
        type: 'wallet',
        webhookUrl: 'https://webhook.site/4f1b1b1b-1b1b-4f1b-1b1b-1b1b1b1b1b1b',
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        network: 'evm',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, or a hex-string starting with '0x'"`,
    );
  });
});
