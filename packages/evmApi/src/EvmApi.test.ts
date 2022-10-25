import { MoralisCore, AxiosRetry } from '@moralisweb3/common-core';
import { ApiUtils, ApiUtilsConfig } from '@moralisweb3/api-utils';
import { EvmApi } from './EvmApi';

describe('EvmApi', () => {
  it('supports multi-tenancy', async () => {
    function createEvmApi(apiKey: string): EvmApi {
      const core = MoralisCore.create();
      const apiUtils = ApiUtils.create(core);
      const evmApi = EvmApi.create(core);
      core.registerModules([apiUtils, evmApi]);
      core.config.set(ApiUtilsConfig.apiKey, apiKey);
      return evmApi;
    }

    const mockedVersion = '0.0.1c';
    let lastApiKey: string | null = null;

    jest.spyOn(AxiosRetry, 'request').mockImplementation(async (_, request) => {
      lastApiKey = request.headers ? (request.headers['x-api-key'] as string) : null;
      return {
        data: {
          version: mockedVersion,
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };
    });

    const alfaApiKey = 'alfa-api-key';
    const alfa = createEvmApi(alfaApiKey);
    const betaApiKey = 'beta-api-key';
    const beta = createEvmApi(betaApiKey);

    const alfaVersion = await alfa.utils.web3ApiVersion();
    expect(alfaVersion.result.version).toEqual(mockedVersion);
    expect(lastApiKey).toEqual(alfaApiKey);

    const betaVersion = await beta.utils.web3ApiVersion();
    expect(betaVersion.result.version).toEqual(mockedVersion);
    expect(lastApiKey).toEqual(betaApiKey);

    jest.restoreAllMocks();
  });
});
