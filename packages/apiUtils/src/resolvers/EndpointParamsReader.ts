// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
    return this.endpoint.bodyParams.includes(param as keyof ApiParams);
  }

  private isUrlParam(param: string): boolean {
    return !!this.endpoint.urlParams && this.endpoint.urlParams.includes(param as keyof Params);
  }

  public getSearchParams(params: ApiParams): Record<string, unknown> {
    return Object.keys(params).reduce((result, key) => {
      const paramKey = key as keyof ApiParams;

      if (!params[paramKey] || this.isBodyParam(key) || this.isUrlParam(key)) {
        return result;
      }

      return { ...result, [key]: params[paramKey] };
    }, {} as Record<string, unknown>);
  }

  public getBodyParams(params: ApiParams) {
    if (this.endpoint.bodyType === EndpointBodyType.BODY && this.endpoint.bodyParams) {
      // TODO: delete `as unknown`
      const paramName = this.endpoint.bodyParams[0] as unknown as keyof ApiParams;
      return params[paramName];
    }

    return Object.keys(params).reduce((result, key) => {
      // TODO: delete `as unknown`
      const paramName = key as unknown as keyof ApiParams;
      if (!params[paramName] || !this.isBodyParam(key)) {
        return result;
      }
      if (this.endpoint.bodyType === EndpointBodyType.PROPERTY) {
        return { ...result, [key]: params[paramName] };
      }
      return result;
    }, {});
  }
}
