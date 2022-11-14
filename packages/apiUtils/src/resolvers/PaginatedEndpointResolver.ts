import { tryGetNextPageParams } from '../utils/tryGetNextPageParams';
import { ApiPaginatedResultAdapter } from './ApiPaginatedResultAdapter';
import { ApiUtilsConfig } from '../config/ApiUtilsConfig';
import { Core, ApiErrorCode, Config, MoralisApiError, RequestController } from '@moralisweb3/common-core';
import { PaginatedResult, PaginatedEndpoint, PaginatedEndpointFactory, PaginatedParams } from './PaginatedEndpoint';
import { EndpointParamsReader } from './EndpointParamsReader';

export class PaginatedEndpointResolver<
  ApiParams,
  Params extends PaginatedParams,
  ApiResult,
  AdaptedResult,
  JSONResult,
> {
  public static create<ApiParams, Params extends PaginatedParams, ApiResult, AdaptedResult, JSONResult>(
    core: Core,
    baseUrl: string,
    endpointFactory: PaginatedEndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
  ) {
    const requestController = RequestController.create(core);
    const endpoint = endpointFactory(core);
    const paramsReader = new EndpointParamsReader(endpoint);
    return new PaginatedEndpointResolver(endpoint, baseUrl, core.config, requestController, paramsReader);
  }

  public constructor(
    public readonly endpoint: PaginatedEndpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
    private readonly baseUrl: string,
    private readonly config: Config,
    private readonly requestController: RequestController,
    private readonly paramsReader: EndpointParamsReader<
      ApiParams,
      Params,
      PaginatedResult<ApiResult>,
      AdaptedResult,
      JSONResult
    >,
  ) {}

  // TODO: error handler to ApiError
  private get = async (params: Params) => {
    const url = this.createUrl(params);

    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);

    const result = await this.requestController.get<PaginatedResult<ApiResult>>(url, searchParams, {
      headers: this.createHeaders(),
    });

    return new ApiPaginatedResultAdapter(
      result,
      this.endpoint.apiToResult,
      this.endpoint.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  private post = async (params: Params) => {
    const url = this.createUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.post<PaginatedResult<ApiResult>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiPaginatedResultAdapter(
      result,
      this.endpoint.apiToResult,
      this.endpoint.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  private resolveNextCall = (params: Params, result: Awaited<PaginatedResult<ApiResult>>) => {
    const nextParams = tryGetNextPageParams(this.endpoint.firstPageIndex ?? 1, params, result);
    if (nextParams) {
      return () => this.fetch(nextParams);
    }
    return undefined;
  };

  private createUrl(params: Params): string {
    return this.baseUrl + this.endpoint.getUrl(params);
  }

  private createHeaders(): { [key: string]: string } {
    const apiKey = this.config.get(ApiUtilsConfig.apiKey);
    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    return headers;
  }

  public fetch = (
    params: Params,
  ): Promise<ApiPaginatedResultAdapter<Awaited<PaginatedResult<ApiResult>>, AdaptedResult, JSONResult, Params>> => {
    switch (this.endpoint.method) {
      case 'post':
        return this.post(params);
      default:
        return this.get(params);
    }
  };
}
