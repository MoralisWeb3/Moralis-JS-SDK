import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEvmApi, setupEvmApi } from './setup';

describe('web3ApiVersion', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the info Version for web3 Api ', async () => {
    const result = await evmApi.utils.web3ApiVersion();

    expect(result.toJSON().version).toBe('0.0.53');
    expect(result.raw.version).toBe('0.0.53');
    expect(result.result.version).toBe('0.0.53');
  });
});
