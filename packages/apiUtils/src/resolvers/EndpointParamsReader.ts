import { Endpoint, EndpointBodyType } from './Endpoint';

export class EndpointParamsReader<ApiParams, Params, ApiResult, AdaptedResult, JSONResult> {
  public constructor(private readonly endpoint: Endpoint<ApiParams, Params, ApiResult, AdaptedResult, JSONResult>) {}

  protected isBodyParam = (param: string) => {
    if (this.endpoint.method === 'get') {
      return false;
    }
    if (!this.endpoint.bodyParams || this.endpoint.bodyParams.length === 0) {
      return false;
    }
    // @ts-ignore TODO: fix the param string cast from keyof
    return this.endpoint.bodyParams.includes(param);
  };

  public getSearchParams(params: ApiParams) {
    return Object.keys(params).reduce((result, key) => {
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      if (!params[key] || this.isBodyParam(key)) {
        return result;
      }

      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return { ...result, [key]: params[key] };
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
      // @ts-ignore TODO: fix the ApiParams type, as it should extend object/record
      return params[key];
    }, {});
  }
}
