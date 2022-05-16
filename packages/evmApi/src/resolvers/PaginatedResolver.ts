import core, { RequestController } from '@moralis/core';
import { BASE_URL } from '../EvmApi';
import { EvmApiResultAdapter } from '../EvmApiResultAdapter';
import { getNextParams } from '../utils/getNextParams';

type Method = 'get' | 'post';

export interface PaginatedResponse {
  total?: number;
  page?: number;
  page_size?: number;
  cursor?: string;
  result?: any;
}

export interface PaginatedOptions {
  offset?: number;
  limit?: number;
  cursor?: string;
}

interface EvmPaginatedResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  getPath: (params: Params) => string;
  apiToResult: (result: ApiResult) => AdaptedResult;
  resultToJson: (result: AdaptedResult) => JSONResult;
  parseParams: (params: Params) => ApiParams;
  method?: Method;
  bodyParams?: readonly (keyof Params)[];
}

export class EvmPaginatedResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  private getPath: (params: Params) => string;
  private apiToResult: (result: ApiResult) => AdaptedResult;
  private resultToJson: (result: AdaptedResult) => JSONResult;
  private parseParams: (params: Params) => ApiParams;
  private method: Method;
  private bodyParams?: readonly (keyof Params)[];

  constructor({
    getPath,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
  }: EvmPaginatedResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
    this.getPath = getPath;
    this.apiToResult = apiToResult;
    this.resultToJson = resultToJson;
    this.parseParams = parseParams;
    this.method = method ?? 'get';
    this.bodyParams = bodyParams;
  }

  private getUrl = (params: Params) => {
    return `${BASE_URL}/${this.getPath(params)}`;
  };

  private isBodyParam = (param: string) => {
    if (this.method === 'get') {
      return false;
    }
    if (!this.bodyParams || this.bodyParams.length === 0) {
      return false;
    }
    // @ts-ignore TODO: fix the param string cast from keyof
    return this.bodyParams.includes(param);
  };

  private getSearchParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || this.isBodyParam(key)) {
        return result;
      }

      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return { ...result, [key]: params[key] };
    }, {});
  }

  private getBodyParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || !this.isBodyParam(key)) {
        return result;
      }
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return { ...result, [key]: params[key] };
    }, {});
  }

  // // TODO: error handler to ApiError
  private _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await RequestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson, () =>
      this.fetch(getNextParams(params, result)),
    );
  };

  private _apiPost = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const result = await RequestController.post<ApiResult, any, any>(url, searchParams, bodyParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson, () =>
      this.fetch(getNextParams(params, result)),
    );
  };

  fetch = (params: Params): unknown => {
    return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
  };
}
