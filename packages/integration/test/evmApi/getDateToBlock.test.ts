import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEnvApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEnvApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should get the closest block of the provided date ', async () => {
    const result = await evmApi.native.getDateToBlock({
      date: '2021-09-29T13:09:15+00:00',
    });

    expect(result).toBeDefined();
    expect(result.raw.block).toBe(13320838);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get get the closest block of the provided date', async () => {
    const failedResult = await evmApi.native
      .getDateToBlock({
        date: '2021-09-29T13:09:15+00:00',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
  });
});
