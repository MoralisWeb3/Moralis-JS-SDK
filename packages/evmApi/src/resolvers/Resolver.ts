import core, { RequestController } from '@moralis/core';
import { BASE_URL } from '../EvmApi';
import { EvmApiResultAdapter } from '../EvmApiResultAdapter';

type Method = 'get' | 'post';

export interface EvmResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  getPath: (params: Params) => string;
  apiToResult: (result: ApiResult) => AdaptedResult;
  resultToJson: (result: AdaptedResult) => JSONResult;
  parseParams: (params: Params) => ApiParams;
  method?: Method;
  bodyParams?: readonly (keyof Params)[];
}

export class EvmResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  protected getPath: (params: Params) => string;
  protected apiToResult: (result: ApiResult) => AdaptedResult;
  protected resultToJson: (result: AdaptedResult) => JSONResult;
  protected parseParams: (params: Params) => ApiParams;
  protected method: Method;
  protected bodyParams?: readonly (keyof Params)[];

  constructor({
    getPath,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
  }: EvmResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
    this.getPath = getPath;
    this.apiToResult = apiToResult;
    this.resultToJson = resultToJson;
    this.parseParams = parseParams;
    this.method = method ?? 'get';
    this.bodyParams = bodyParams;
  }

  protected getUrl = (params: Params) => {
    return `${BASE_URL}/${this.getPath(params)}`;
  };

  protected isBodyParam = (param: string) => {
    if (this.method === 'get') {
      return false;
    }
    if (!this.bodyParams || this.bodyParams.length === 0) {
      return false;
    }
    // @ts-ignore TODO: fix the param string cast from keyof
    return this.bodyParams.includes(param);
  };

  protected getSearchParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || this.isBodyParam(key)) {
        return result;
      }

      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return { ...result, [key]: params[key] };
    }, {});
  }

  protected getBodyParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || !this.isBodyParam(key)) {
        return result;
      }
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return { ...result, [key]: params[key] };
    }, {});
  }

  // TODO: error handler to ApiError
  protected _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await RequestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson);
  };

  protected _apiPost = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const result = await RequestController.post<ApiResult, Record<string, string>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: {
          'x-api-key': core.config.get('apiKey') ?? undefined,
        },
      },
    );

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson);
  };

  fetch = (params: Params) => {
    return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
  };
}
