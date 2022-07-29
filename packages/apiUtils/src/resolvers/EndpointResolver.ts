import { MoralisCore, ApiErrorCode, Config, MoralisApiError, RequestController } from '@moralisweb3/core';
import { ApiConfig } from '../config/ApiConfig';
import { ApiResultAdapter } from './ApiResultAdapter';
import { Endpoint, EndpointFactory } from './Endpoint';
import { EndpointParamsReader } from './EndpointParamsReader';

export class EndpointResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  public static create<AP, P, AR, ADR, JR>(core: MoralisCore, endpointFactory: EndpointFactory<AP, P, AR, ADR, JR>) {
    const requestController = RequestController.create(core);
    const endpoint = endpointFactory(core);
    const paramsReader = new EndpointParamsReader(endpoint);
    return new EndpointResolver(core.config, requestController, endpoint, paramsReader);
  }

  public constructor(
    private readonly config: Config,
    private readonly requestController: RequestController,
    private readonly endpoint: Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
    private readonly paramsReader: EndpointParamsReader<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
  ) {}

  // TODO: error handler to ApiError
  private get = async (params: Params) => {
    const url = this.endpoint.getUrl(params);

    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await this.requestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: this.createHeaders(),
    });

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private post = async (params: Params) => {
    const url = this.endpoint.getUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.post<ApiResult, Record<string, string>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private put = async (params: Params) => {
    const url = this.endpoint.getUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.put<ApiResult, Record<string, string>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private createHeaders(): { [key: string]: string } {
    const apiKey = this.config.get(ApiConfig.apiKey);
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    return headers;
  }

  public fetch = (params: Params) => {
    const apiKey = this.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    switch (this.endpoint.method) {
      case 'post':
        return this.post(params);
      case 'put':
        return this.put(params);
      default:
        return this.get(params);
    }
  };
}
