import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('web3ApiVersion', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('returns version', async () => {
    const result = await evmApi.utils.web3ApiVersion();

    expect(result.result.version).toEqual('0.0.53');
  });
});
