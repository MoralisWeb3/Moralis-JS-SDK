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

    server.listen({
      onUnhandledRequest: 'warn',
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should get the transaction of an account', async () => {
    const result = await EvmApi.native.getTransaction({
      transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5',
    });

    expect(result).toBeDefined();
    expect(result.legacy.gas).toBe('247689');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the transaction of an invalid hash and throw an error ', async () => {
    const failedResult = await EvmApi.native
      .getTransaction({
        transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      EvmApi.native.getTransaction({
        transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
