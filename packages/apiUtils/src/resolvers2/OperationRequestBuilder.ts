import MoralisCore, {
  ApiErrorCode,
  MoralisApiError,
  Operation,
  OperationRequestBody,
  OperationRequestPropertiesBody,
  OperationRequestRawBody,
} from '@moralisweb3/core';
import { ApiConfig } from '../config';
import { getCommonHeaders } from '../resolvers/getCommonHeaders';

export class OperationRequestBuilder<Request> {
  public constructor(
    private readonly operation: Operation<Request, unknown, unknown, unknown>,
    private readonly core: MoralisCore,
  ) {}

  public prepareUrl(request: Request) {
    const urlParams = this.operation.getRequestUrlParams(request, this.core);

    let urlPath = this.operation.urlPathPattern;

    for (const paramName of this.operation.urlPathParamNames) {
      const paramValue = urlParams[paramName as string];
      urlPath = urlPath.replace(`{${paramName as string}}`, paramValue);
    }

    const urlSearchParams: Record<string, string> = {};
    if (this.operation.urlSearchParamNames) {
      for (const paramName of this.operation.urlSearchParamNames) {
        urlSearchParams[paramName as string] = urlParams[paramName as string];
      }
    }

    return { urlPath, urlSearchParams };
  }

  public prepareBody(request: Request): OperationRequestBody | null {
    if (!this.operation.bodyType && !this.operation.getRequestBody) {
      return null;
    }
    if (!this.operation.getRequestBody) {
      throw new Error(`getRequestBody is not implemented for operation ${this.operation.name}`);
    }

    const body = this.operation.getRequestBody(request, this.core);

    if (this.operation.bodyType === 'properties') {
      if (!this.operation.bodyParamNames) {
        throw new Error(`bodyParamNames are empty for operation ${this.operation.name}`);
      }

      const properties: OperationRequestPropertiesBody = {};
      for (const paramName of this.operation.bodyParamNames) {
        properties[paramName as string] = (body as Record<string, unknown>)[paramName as string];
      }
      return properties;
    }

    if (this.operation.bodyType === 'raw') {
      return body as OperationRequestRawBody;
    }

    throw new Error(`Not supported body type: ${this.operation.bodyType}`);
  }

  public prepareHeaders(): Record<string, string> {
    const apiKey = this.core.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisApiError({
        code: ApiErrorCode.API_KEY_NOT_SET,
        message: 'apiKey is not set',
      });
    }

    const headers = getCommonHeaders();
    headers['x-api-key'] = apiKey;
    return headers;
  }
}
