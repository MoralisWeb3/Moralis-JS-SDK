import MoralisCore from '@moralisweb3/core';
import { Operation, OperationBody, OperationPropertiesBody, OperationRawBody } from './Operation';

export class OperationRequestBuilder<Request> {
  public constructor(
    private readonly operation: Operation<Request, unknown, unknown>,
    private readonly core: MoralisCore,
  ) {}

  public prepareUrl(request: Request) {
    const urlParams = this.operation.parseUrlParams(request, this.core);

    let urlPath = this.operation.urlPathPattern;
    let urlSearchParamNames = Object.keys(urlParams);

    for (const paramName of this.operation.urlPathParamNames) {
      const paramValue = urlParams[paramName as string];
      urlPath = urlPath.replace(`{${paramName as string}}`, paramValue);
    }

    urlSearchParamNames = urlSearchParamNames.filter((name) => {
      return !(
        this.operation.urlPathParamNames?.includes(name as keyof Request) ||
        this.operation.bodyParamNames?.includes(name as keyof Request)
      );
    });

    const urlSearchParams: Record<string, string> = {};
    for (const paramName of urlSearchParamNames) {
      urlSearchParams[paramName] = urlParams[paramName];
    }

    return { urlPath, urlSearchParams };
  }

  public prepareBody(request: Request): OperationBody | null {
    if (!this.operation.parseBody) {
      return null;
    }

    const body = this.operation.parseBody(request, this.core);

    if (this.operation.bodyType === 'properties') {
      if (!this.operation.bodyParamNames) {
        throw new Error(`Expected bodyParamsNames for endpoint ${this.operation.name}`);
      }

      const properties: OperationPropertiesBody = {};
      for (const paramName of this.operation.bodyParamNames) {
        properties[paramName as string] = (body as Record<string, unknown>)[paramName as string];
      }
      return properties;
    }

    if (this.operation.bodyType === 'raw') {
      return body as OperationRawBody;
    }

    throw new Error(`Not supported body type: ${this.operation.bodyType}`);
  }
}
