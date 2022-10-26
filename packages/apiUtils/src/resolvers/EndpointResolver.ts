import { Core, ApiErrorCode, Config, MoralisApiError, RequestController, CoreConfig } from '@moralisweb3/common-core';
import { ApiUtilsConfig } from '../config/ApiUtilsConfig';
import { isNotFoundError } from '../errors/isNotFoundError';
import { ApiResultAdapter } from './ApiResultAdapter';
import { Endpoint, EndpointFactory } from './Endpoint';
import { EndpointParamsReader } from './EndpointParamsReader';
import { getCommonHeaders } from './getCommonHeaders';

export class EndpointResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  public static create<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>(
    core: Core,
    baseUrl: string,
    endpointFactory: EndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
  ) {
    const requestController = RequestController.create(core);
    const endpoint = endpointFactory(core);
    const paramsReader = new EndpointParamsReader(endpoint);
    return new EndpointResolver(endpoint, baseUrl, core.config, requestController, paramsReader);
  }

  public constructor(
    public readonly endpoint: Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
    private readonly baseUrl: string,
    private readonly config: Config,
    private readonly requestController: RequestController,
    private readonly paramsReader: EndpointParamsReader<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
  ) {}

  // TODO: error handler to ApiError
  private get = async (params: Params) => {
    const url = this.createUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);

    const result = await this.requestController.get<ApiResult>(url, searchParams, {
      headers: this.createHeaders(),
    });

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private post = async (params: Params) => {
    const url = this.createUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.post<ApiResult, Record<string, string>>(url, searchParams, bodyParams, {
      headers: this.createHeaders(),
    });

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private put = async (params: Params) => {
    const url = this.createUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.put<ApiResult, Record<string, string>>(url, searchParams, bodyParams, {
      headers: this.createHeaders(),
    });

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private delete = async (params: Params) => {
    const url = this.createUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.delete<ApiResult, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiResultAdapter(result, this.endpoint.apiToResult, this.endpoint.resultToJson, params);
  };

  private createUrl(params: Params): string {
    return this.baseUrl + this.endpoint.getUrl(params);
  }

  private createHeaders(): { [key: string]: string } {
    const apiKey = this.config.get(ApiUtilsConfig.apiKey);
    const product = this.config.get(CoreConfig.product);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getCommonHeaders();

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    if (product) {
      headers['x-moralis-product'] = product;
    }

    return headers;
  }

  public fetch = (params: Params): Promise<ApiResultAdapter<Awaited<ApiResult>, AdaptedResult, JSONResult, Params>> => {
    switch (this.endpoint.method) {
      case 'post':
        return this.post(params);
      case 'put':
        return this.put(params);
      case 'delete':
        return this.delete(params);
      default:
        return this.get(params);
    }
  };

  public fetchNullable = async (
    params: Params,
  ): Promise<ApiResultAdapter<Awaited<ApiResult>, AdaptedResult, JSONResult, Params> | null> => {
    try {
      const result = await this.fetch(params);

      // TODO: this block should be deleted after the back-end adjustments.
      if (!result.raw || (typeof result.raw === 'object' && Object.keys(result.raw).length === 0)) {
        throw new MoralisApiError({
          code: ApiErrorCode.NOT_FOUND,
          message: 'The resource is not found',
        });
      }

      return result;
    } catch (e) {
      if (isNotFoundError(e)) {
        return null;
      }
      throw e;
    }
  };
}
