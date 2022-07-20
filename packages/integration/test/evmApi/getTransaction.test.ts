import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEvmApi } from './setup';

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should get the transaction of an account', async () => {
    const result = await evmApi.native.getTransaction({
      transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd5',
    });

    expect(result).toBeDefined();
    expect(result.raw.gas).toBe('247689');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the transaction of an invalid hash and throw an error ', async () => {
    const failedResult = await evmApi.native
      .getTransaction({
        transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.native.getTransaction({
        transactionHash: '0xdd9006489e46670e0e85d1fb88823099e7f596b08aeaac023e9da0851f26fdd',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
