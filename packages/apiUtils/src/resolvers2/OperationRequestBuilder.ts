import Core, {
  ApiErrorCode,
  CoreConfig,
  MoralisApiError,
  Operation,
  OperationRequestBody,
  OperationRequestPropertiesBody,
  OperationRequestRawBody,
} from '@moralisweb3/common-core';
import { ApiUtilsConfig } from '../config';
import { getCommonHeaders } from './getCommonHeaders';

export class OperationRequestBuilder<Request> {
  public constructor(
    private readonly operation: Operation<Request, unknown, unknown, unknown>,
    private readonly core: Core,
  ) {}

  public prepareUrl(baseUrl: string, request: Request) {
    const urlParams = this.operation.getRequestUrlParams(request, this.core);

    let urlPath = this.operation.urlPathPattern;

    for (const paramName of this.operation.urlPathParamNames ?? []) {
      const paramValue = urlParams[paramName as string];
      if (!paramValue) {
        throw new Error(`Param ${paramName as string} is required`);
      }
      urlPath = urlPath.replace(`{${paramName as string}}`, paramValue as string);
    }
    const url = `${baseUrl}${urlPath}`;

    const urlSearchParams: Record<string, string | string[] | boolean> = {};
    Object.keys(urlParams)
      .filter((paramName) => !this.operation.urlPathParamNames?.includes(paramName as keyof Request))
      .forEach((paramName) => {
        const paramValue = urlParams[paramName];
        if (paramValue) {
          urlSearchParams[paramName] = paramValue;
        }
      });

    return { url, urlSearchParams };
  }

  public prepareBody(request: Request): OperationRequestBody | undefined {
    if (!this.operation.bodyType && !this.operation.getRequestBody) {
      return undefined;
    }
    if (!this.operation.getRequestBody) {
      throw new Error(`getRequestBody is not implemented for operation ${this.operation.name}`);
    }
    if (!this.operation.bodyParamNames) {
      throw new Error(`bodyParamNames are empty for operation ${this.operation.name}`);
    }

    const body = this.operation.getRequestBody(request, this.core);

    if (this.operation.bodyType === 'properties') {
      return body as OperationRequestPropertiesBody;
    }
    if (this.operation.bodyType === 'raw') {
      return body as OperationRequestRawBody;
    }

    throw new Error(`Not supported body type: ${this.operation.bodyType}`);
  }

  public prepareHeaders(): Record<string, string> {
    const apiKey = this.core.config.get(ApiUtilsConfig.apiKey);
    const product = this.core.config.get(CoreConfig.product);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getCommonHeaders();
    headers['x-api-key'] = apiKey;
    if (product) {
      headers['x-moralis-product'] = product;
    }
    return headers;
  }
}
