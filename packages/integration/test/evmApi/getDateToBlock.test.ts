import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';
import { MOCK_API_KEY } from '../../mockRequests/config';
import { mockServer } from '../../mockRequests/mockRequests';

describe('Moralis EvmApi', () => {
  const server = mockServer;

  beforeAll(() => {
    Core.registerModules([EvmApi]);
    Core.start({
      apiKey: MOCK_API_KEY,
    });

    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should get the closest block of the provided date ', async () => {
    const result = await EvmApi.native.getDateToBlock({
      date: '2021-09-29T13:09:15+00:00',
    });

    expect(result).toBeDefined();
    expect(result.raw.block).toBe(13320838);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get get the closest block of the provided date', async () => {
    const failedResult = await EvmApi.native
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
