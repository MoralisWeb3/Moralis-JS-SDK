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

  it('should get the block of an account', async () => {
    const result = await evmApi.native.getBlock({
      blockNumberOrHash: '1000000',
    });

    expect(result).toBeDefined();
    expect(result.raw.hash).toBe('0x8e38b4dbf6b11fcc3b9dee84fb7986e29ca0a02cecd8977c161ff7333329681e');
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the block of an hash and throw an error ', async () => {
    const failedResult = await evmApi.native
      .getBlock({
        blockNumberOrHash: '100000',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.native.getBlock({
        blockNumberOrHash: '100000',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
