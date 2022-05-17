import { checkObjEqual } from './../utils/checkObjEqual';
import { EvmResolver, EvmResolverOptions } from './Resolver';
import core, { RequestController } from '@moralis/core';
import { getNextParams } from '../utils/getNextParams';
import { EvmApiPaginatedResultAdapter } from '../EvmApiPaginatedResultAdapter';

export interface PaginatedResponse<Data> {
  total?: number;
  page?: number;
  page_size?: number;
  cursor?: string;
  result?: Data;
}

export interface PaginatedOptions {
  offset?: number;
  limit?: number;
  cursor?: string;
}

export class EvmPaginatedResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> extends EvmResolver<
  ApiParams,
  Params,
  ApiResult,
  AdaptedResult,
  JSONResult
> {
  constructor({
    getPath,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
  }: EvmResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
    super({ getPath, apiToResult, resultToJson, parseParams, method, bodyParams });
  }

  // // TODO: error handler to ApiError
  _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await RequestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      this.resolveNextCall(params, result),
    );
  };

  _apiPost = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const result = await RequestController.post<ApiResult, any, any>(url, searchParams, bodyParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiPaginatedResultAdapter(
      result,
      this.apiToResult,
      this.resultToJson,
      this.resolveNextCall(params, result),
    );
  };

  private resolveNextCall = (params: Params, result: Awaited<ApiResult>) => {
    const nextParams = getNextParams<Params, AdaptedResult>(params, result);
    return checkObjEqual(params, nextParams) ? undefined : () => this.fetch(nextParams);
  };

  fetch = (params: Params): Promise<EvmApiPaginatedResultAdapter<Awaited<ApiResult>, AdaptedResult, JSONResult>> => {
    return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
  };
}
