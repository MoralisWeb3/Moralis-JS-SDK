import { checkObjEqual } from './utils/checkObjEqual';
import { ApiResolver, ApiResolverOptions } from './Resolver';
import { getNextParams } from './utils/getNextParams';
import { ApiPaginatedResultAdapter } from './ApiPaginatedResultAdapter';
import { ApiConfig } from './config/ApiConfig';
import { ApiErrorCode, MoralisApiError } from '@moralisweb3/core';

export interface ApiPaginatedResponse<Data> {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: Data;
}

export interface ApiPaginatedOptions extends Record<string, unknown> {
  offset?: number;
  limit?: number;
  cursor?: string;
}

export class ApiPaginatedResolver<
  ApiParams,
  Params extends ApiPaginatedOptions,
  ApiResult,
  AdaptedResult,
  JSONResult,
> extends ApiResolver<ApiParams, Params, ApiPaginatedResponse<ApiResult>, AdaptedResult, JSONResult> {
  constructor({
    getUrl,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
    bodyType,
    name,
  }: ApiResolverOptions<ApiParams, Params, ApiPaginatedResponse<ApiResult>, AdaptedResult, JSONResult>) {
    super({ getUrl, apiToResult, resultToJson, parseParams, method, bodyParams, bodyType, name });
  }

  // TODO: error handler to ApiError
  _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await this.requestController.get<PaginatedResponse<ApiResult>, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': this.config.get(ApiConfig.apiKey),
      },
    });

    return new ApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  _apiPost = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const apiKey = this.config.get(ApiConfig.apiKey);
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const result = await this.requestController.post<
      ApiPaginatedResponse<ApiResult>,
      Record<string, string>,
      Record<string, string>
    >(url, searchParams, bodyParams, {
      headers,
    });

    return new ApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  private resolveNextCall = (params: Params, result: Awaited<ApiPaginatedResponse<ApiResult>>) => {
    const nextParams = getNextParams(params, result);
    return checkObjEqual(params, nextParams) ? undefined : () => this.fetch(nextParams);
  };

  fetch = (
    params: Params,
  ): Promise<
    ApiPaginatedResultAdapter<Awaited<ApiPaginatedResponse<ApiResult>>, AdaptedResult, JSONResult, Params>
  > => {
    const apiKey = this.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
  };
}
