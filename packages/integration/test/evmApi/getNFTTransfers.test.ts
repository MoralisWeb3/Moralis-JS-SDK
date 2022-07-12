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

  it('should get the NFTs Transfers of an account address', async () => {
    const result = await evmApi.account.getNFTTransfers({
      address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw.total).toBe(126);
  });

  it('should not get the NFTs Transfers and return an error code for an invalid address', () => {
    const failedResult = evmApi.account
      .getNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getNFTTransfers({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
