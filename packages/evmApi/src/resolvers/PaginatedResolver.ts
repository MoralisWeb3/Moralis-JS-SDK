import { checkObjEqual } from './../utils/checkObjEqual';
import { EvmResolver, EvmResolverOptions, ServerResponse } from './Resolver';
import { getNextParams } from '../utils/getNextParams';
import { EvmApiPaginatedResultAdapter } from '../EvmApiPaginatedResultAdapter';
import { EvmApiConfig } from '../config/EvmApiConfig';

export interface PaginatedResponse<Data> {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: Data;
}

export interface PaginatedOptions extends Record<string, unknown> {
  offset?: number;
  limit?: number;
  cursor?: string;
}

export class EvmPaginatedResolver<
  ApiParams,
  Params extends PaginatedOptions,
  ApiResult,
  AdaptedResult,
  JSONResult,
> extends EvmResolver<ApiParams, Params, PaginatedResponse<ApiResult>, AdaptedResult, JSONResult> {
  constructor({
    getPath,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
    bodyType,
    name,
  }: EvmResolverOptions<ApiParams, Params, PaginatedResponse<ApiResult>, AdaptedResult, JSONResult>) {
    super({ getPath, apiToResult, resultToJson, parseParams, method, bodyParams, bodyType, name });
  }

  // TODO: error handler to ApiError
  _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await this.requestController.get<PaginatedResponse<ApiResult>, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': this.config.get(EvmApiConfig.apiKey),
      },
    });

    return new EvmApiPaginatedResultAdapter(
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

    const apiKey = this.config.get(EvmApiConfig.apiKey);
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    const result = await this.requestController.post<
      PaginatedResponse<ApiResult>,
      Record<string, string>,
      Record<string, string>
    >(url, searchParams, bodyParams, {
      headers,
    });

    return new EvmApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  protected _serverRequest = async (params: Params) => {
    const url = this.getServerUrl();
    const apiParams = this.parseParams(params);

    const { result } = await this.requestController.post<
      ServerResponse<PaginatedResponse<ApiResult>>,
      Record<string, string>,
      //@ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      ApiParams
      // Requests to the server are always a post request with bodyparams, no need to supply searchparams
    >(url, {}, apiParams);

    return new EvmApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      params,
      this.resolveNextCall(params, result),
    );
  };

  private resolveNextCall = (params: Params, result: Awaited<PaginatedResponse<ApiResult>>) => {
    const nextParams = getNextParams(params, result);
    return checkObjEqual(params, nextParams) ? undefined : () => this.fetch(nextParams);
  };

  fetch = (
    params: Params,
  ): Promise<
    EvmApiPaginatedResultAdapter<Awaited<PaginatedResponse<ApiResult>>, AdaptedResult, JSONResult, Params>
  > => {
    if (this.config.get('apiKey')) {
      return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
    }
    return this._serverRequest(params);
  };
}
