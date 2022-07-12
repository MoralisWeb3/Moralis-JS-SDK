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

  it('should get the info Version for web3 Api ', async () => {
    const result = await evmApi.info.web3ApiVersion();

    expect(result.toJSON().version).toBe('0.0.53');
    expect(result.raw.version).toBe('0.0.53');
    expect(result.result.version).toBe('0.0.53');
  });
});
