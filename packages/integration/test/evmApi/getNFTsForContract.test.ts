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

  it('should get the NFTs of an account address', async () => {
    const result = await evmApi.account.getNFTsForContract({
      address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
      format: 'decimal',
      chain: 'polygon',
      tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(900);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the NFTs and return an error code for an invalid address', () => {
    const failedResult = evmApi.account
      .getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        format: 'decimal',
        chain: 'polygon',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387',
        format: 'decimal',
        chain: 'polygon',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });

  it('should not get the NFTs and return an error code for an invalid chain', () => {
    const failedResult = evmApi.account
      .getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        format: 'decimal',
        chain: 'polygo',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        format: 'decimal',
        chain: 'polygo',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"[C0005] Invalid provided chain, value must be a positive number, chain-name or a hex-string starting with '0x'"`,
    );
  });

  it('should not get the NFTs and return an error code for an invalid token address', () => {
    const failedResult = evmApi.account
      .getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        format: 'decimal',
        chain: 'polygon',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF0599974963',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.account.getNFTsForContract({
        address: '0x75e3e9c92162e62000425c98769965a76c2e387a',
        format: 'decimal',
        chain: 'polygon',
        tokenAddress: '0x2953399124F0cBB46d2CbACD8A89cF059997496',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
