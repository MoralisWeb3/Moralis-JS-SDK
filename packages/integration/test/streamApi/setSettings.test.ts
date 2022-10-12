import { MoralisStreams } from '@moralisweb3/streams';
import { cleanStreamsApi, setupStreamApi } from './setup';

describe('Set settings', () => {
  let StreamApi: MoralisStreams;

  beforeAll(() => {
    StreamApi = setupStreamApi();
  });

  afterAll(() => {
    cleanStreamsApi();
  });

  it('should set stream settings ', async () => {
    const result = await StreamApi.setSettings({
      region: 'eu-central-1',
    });

    expect(result.result.success).toEqual(true);
  });

  it('should throw an error on invalid region ', async () => {
    expect(
      StreamApi.setSettings({
        // @ts-expect-error
        region: 'eu-central-100',
      }),
    ).rejects.toThrowError(
      `[C0006] Request failed, Unprocessable Entity(422): Validation Failed {"requestBody.region":{"message":"should be one of the following; ['us-east-1','us-west-2','eu-central-1','ap-southeast-1']","value":"eu-central-100"}}`,
    );
  });
});
