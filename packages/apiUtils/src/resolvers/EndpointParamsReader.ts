import { Endpoint, EndpointBodyType } from './Endpoint';

export class EndpointParamsReader<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  public constructor(private readonly endpoint: Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {}

  private isBodyParam(param: string): boolean {
    if (this.endpoint.method === 'get') {
      return false;
    }
    if (!this.endpoint.bodyParams || this.endpoint.bodyParams.length === 0) {
      return false;
    }
    return this.endpoint.bodyParams.includes(param as keyof Params);
  }

  private isUrlParam(param: string): boolean {
    return !!this.endpoint.urlParams && this.endpoint.urlParams.includes(param as keyof Params);
  }

  public getSearchParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      const paramKey = key as keyof ApiParams;

      if (!params[paramKey] || this.isBodyParam(key) || this.isUrlParam(key)) {
        return result;
      }

      return { ...result, [key]: params[paramKey] };
    }, {});
  }

  public getBodyParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || !this.isBodyParam(key)) {
        return result;
      }
      if (this.endpoint.bodyType === EndpointBodyType.PROPERTY) {
        // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
        return { ...result, [key]: params[key] };
      }
      return result;
    }, {});
  }
}
