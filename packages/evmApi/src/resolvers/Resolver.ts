import core, { ApiErrorCode, MoralisApiError, RequestController } from '@moralisweb3/core';
import { BASE_URL } from '../EvmApi';
import { EvmApiResultAdapter } from '../EvmApiResultAdapter';

type Method = 'get' | 'post';
export enum BodyType {
  PROPERTY = 'property',
  BODY = 'body',
}

export interface ServerResponse<ApiResult> {
  result: ApiResult;
}

export interface EvmResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  getPath: (params: Params) => string;
  apiToResult: (result: ApiResult, params: Params) => AdaptedResult;
  resultToJson: (result: AdaptedResult) => JSONResult;
  parseParams: (params: Params) => ApiParams;
  method?: Method;
  bodyParams?: readonly (keyof Params)[];
  bodyType?: BodyType;
  name: string;
}

export class EvmResolver<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  protected getPath: (params: Params) => string;
  protected apiToResult: (result: ApiResult, params: Params) => AdaptedResult;
  protected resultToJson: (result: AdaptedResult) => JSONResult;
  protected parseParams: (params: Params) => ApiParams;
  protected method: Method;
  protected bodyParams?: readonly (keyof Params)[];
  protected bodyType?: BodyType;
  protected name: string;

  constructor({
    getPath,
    apiToResult,
    resultToJson,
    parseParams,
    method,
    bodyParams,
    bodyType,
    name,
  }: EvmResolverOptions<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {
    this.getPath = getPath;
    this.apiToResult = apiToResult;
    this.resultToJson = resultToJson;
    this.parseParams = parseParams;
    this.method = method ?? 'get';
    this.bodyParams = bodyParams;
    this.bodyType = bodyType ?? BodyType.PROPERTY;
    this.name = name;
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
    const result = await RequestController.get<ApiResult, ApiParams>(url, searchParams, {
      headers: {
        'x-api-key': core.config.get('apiKey') ?? undefined,
      },
    });

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
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

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
  };

  protected _serverRequest = async (params: Params) => {
    const url = this.getServerUrl();
    const apiParams = this.parseParams(params);

    const searchParams = this.getSearchParams(apiParams);
    const bodyParams = this.getBodyParams(apiParams);

    const { result } = await RequestController.post<
      ServerResponse<ApiResult>,
      Record<string, string>,
      Record<string, string>
    >(url, searchParams, bodyParams);

    return new EvmApiResultAdapter(result, this.apiToResult, this.resultToJson, params);
  };

  protected getServerUrl() {
    const serverUrl = core.config.get('serverUrl');
    if (!serverUrl) {
      throw new MoralisApiError({
        code: ApiErrorCode.GENERIC_API_ERROR,
        message: 'EvmApi failed: start with apiKey or serverUrl',
      });
    }
    return `${serverUrl}/functions/${this.name}`;
  }

  fetch = (params: Params) => {
    if (core.config.get('apiKey')) {
      return this.method === 'post' ? this._apiPost(params) : this._apiGet(params);
    }
    return this._serverRequest(params);
  };
}
