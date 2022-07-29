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
  public static create<AP, P extends PaginatedParams, AR, ADR, JR>(
    core: MoralisCore,
    endpointFactory: PaginatedEndpointFactory<AP, P, AR, ADR, JR>,
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
      headers: {
        'x-api-key': this.config.get(ApiConfig.apiKey),
      },
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

    const apiKey = this.config.get(ApiConfig.apiKey);
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const result = await this.requestController.post<
      PaginatedResult<ApiResult>,
      Record<string, string>,
      Record<string, string>
    >(url, searchParams, bodyParams, {
      headers,
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

  public fetch = (
    params: Params,
  ): Promise<ApiPaginatedResultAdapter<Awaited<PaginatedResult<ApiResult>>, AdaptedResult, JSONResult, Params>> => {
    const apiKey = this.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    return this.endpoint.method === 'post' ? this.post(params) : this.get(params);
  };
}
