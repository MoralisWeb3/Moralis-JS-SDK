import { Core, AxiosRetry } from '@moralisweb3/common-core';
import { ApiUtils, ApiUtilsConfig } from '@moralisweb3/api-utils';
import { EvmApi } from './EvmApi';

describe('EvmApi', () => {
  function setupEvmApi() {
    const core = Core.create();
    const apiUtils = ApiUtils.create(core);
    const evmApi = EvmApi.create(core);
    core.registerModules([apiUtils, evmApi]);
    return { core, evmApi };
  }

  it('supports multi-tenancy', async () => {
    function setupMultiTenancyEvmApi(apiKey: string): EvmApi {
      const { core, evmApi } = setupEvmApi();
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
    const alfa = setupMultiTenancyEvmApi(alfaApiKey);
    const betaApiKey = 'beta-api-key';
    const beta = setupMultiTenancyEvmApi(betaApiKey);

    const alfaVersion = await alfa.utils.web3ApiVersion();
    expect(alfaVersion.result.version).toEqual(mockedVersion);
    expect(lastApiKey).toEqual(alfaApiKey);

    const betaVersion = await beta.utils.web3ApiVersion();
    expect(betaVersion.result.version).toEqual(mockedVersion);
    expect(lastApiKey).toEqual(betaApiKey);

    jest.restoreAllMocks();
  });

  it('returns default baseUrl', () => {
    const { evmApi } = setupEvmApi();

    expect(evmApi.baseUrl).toBe('https://deep-index.moralis.io/api/v2');
  });

  it('supports custom baseUrl', () => {
    const customBaseUrl = 'https://custom-evm-api-url.com';

    const { core, evmApi } = setupEvmApi();
    core.config.set('evmApiBaseUrl', customBaseUrl);

    expect(evmApi.baseUrl).toBe(customBaseUrl);
  });
});
