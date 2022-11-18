import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi2, setupEvmApi2 } from '../setup';

describe('web3ApiVersion', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi2();
  });

  afterAll(() => {
    cleanEvmApi2();
  });

  it('returns version', async () => {
    const result = await evmApi.utils.web3ApiVersion();

    expect(result.result.version).toEqual('0.0.53');
  });
});
