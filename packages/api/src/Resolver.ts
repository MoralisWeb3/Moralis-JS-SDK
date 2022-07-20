import { ApiErrorCode, Config, MoralisCoreProvider, MoralisApiError, RequestController } from '@moralisweb3/core';
import { ApiConfig } from './config/ApiConfig';
import { ApiResultAdapter } from './ApiResultAdapter';

type Method = 'get' | 'post' | 'put';
export enum BodyType {
  PROPERTY = 'property',
  BODY = 'body',
}

export interface ApiResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  getUrl: (params: Params) => string;
  apiToResult: (result: ApiResult, params: Params) => AdaptedResult;
  resultToJson: (result: AdaptedResult) => JSONResult;
  parseParams: (params: Params) => ApiParams;
  method?: Method;
  bodyParams?: readonly (keyof Params)[];
  bodyType?: BodyType;
  name: string;
}

export class ApiResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  protected getUrl: (params: Params) => string;
  protected apiToResult: (result: ApiResult, params: Params) => AdaptedResult;
  protected resultToJson: (result: AdaptedResult) => JSONResult;
  protected parseParams: (params: Params) => ApiParams;
  protected method: Method;
  protected bodyParams?: readonly (keyof Params)[];
  protected bodyType?: BodyType;
  protected name: string;
  protected readonly config: Config;
  protected readonly requestController: RequestController;

  constructor({
    getUrl,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
    bodyType,
    name,
  }: ApiResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
    this.getUrl = getUrl;
    this.apiToResult = apiToResult;
    this.resultToJson = resultToJson;
    this.parseParams = parseParams;
    this.method = method ?? 'get';
    this.bodyParams = bodyParams;
    this.bodyType = bodyType ?? BodyType.PROPERTY;
    this.name = name;
    const core = MoralisCoreProvider.getDefault();
    this.config = core.config;
    this.requestController = RequestController.create(core);
  }

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
      if (this.bodyType === BodyType.PROPERTY) {
        // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
        return { ...result, [key]: params[key] };
      }
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return params[key];
    }, {});
  }

  // TODO: error handler to ApiError
  protected _apiGet = async (params: Params) => {
    const url = this.getUrl(params);

    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);

    // @ts-ignore TODO: fix the ApiParams type, as it should extend Searchparams
    const result = await this.requestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: this.createHeaders(),
    });

    return new ApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
  };

  protected _apiPost = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const result = await this.requestController.post<ApiResult, Record<string, string>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
  };

  protected _apiPut = async (params: Params) => {
    const url = this.getUrl(params);
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const result = await this.requestController.put<ApiResult, Record<string, string>, Record<string, string>>(
      url,
      searchParams,
      bodyParams,
      {
        headers: this.createHeaders(),
      },
    );

    return new ApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
  };

  private createHeaders(): { [key: string]: string } {
    const apiKey = this.config.get(ApiConfig.apiKey);
    const headers: { [key: string]: string } = {};
    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }
    return headers;
  }

  fetch = (params: Params) => {
    const apiKey = this.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    switch (this.method) {
      case 'post':
        return this._apiPost(params);
      case 'put':
        return this._apiPut(params);
      default:
        return this._apiGet(params);
    }
  };
}
