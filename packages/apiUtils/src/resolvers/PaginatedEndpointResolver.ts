import { checkObjEqual } from '../utils/checkObjEqual';
import { getNextParams } from '../utils/getNextParams';
import { ApiPaginatedResultAdapter } from './ApiPaginatedResultAdapter';
import { ApiConfig } from '../config/ApiConfig';
import { MoralisCore, ApiErrorCode, Config, MoralisApiError, RequestController } from '@moralisweb3/core';
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
    core: MoralisCore,
    endpointFactory: PaginatedEndpointFactory<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
  ) {
    const requestController = RequestController.create(core);
    const endpoint = endpointFactory(core);
    const paramsReader = new EndpointParamsReader(endpoint);
    return new PaginatedEndpointResolver(core.config, requestController, endpoint, paramsReader);
  }

  public constructor(
    private readonly config: Config,
    private readonly requestController: RequestController,
    private readonly endpoint: PaginatedEndpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>,
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
    const url = this.endpoint.getUrl(params);

    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await this.requestController.get<PaginatedResponse<ApiResult>, ApiParams>(url, searchParams, {
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
    const url = this.endpoint.getUrl(params);
    const apiParams = this.endpoint.parseParams(params);

    const searchParams = this.paramsReader.getSearchParams(apiParams);
    const bodyParams = this.paramsReader.getBodyParams(apiParams);

    const result = await this.requestController.post<
      PaginatedResult<ApiResult>,
      Record<string, string>,
      Record<string, string>
    >(url, searchParams, bodyParams, {
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

  private resolveNextCall = (params: Params, result: Awaited<PaginatedResult<ApiResult>>) => {
    const nextParams = getNextParams(params, result);
    return checkObjEqual(params, nextParams) ? undefined : () => this.fetch(nextParams);
  };

  private createHeaders(): { [key: string]: string } {
    const apiKey = this.config.get(ApiConfig.apiKey);
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
