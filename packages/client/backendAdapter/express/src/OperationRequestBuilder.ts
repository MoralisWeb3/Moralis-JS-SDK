import Core, {
  Operation,
  OperationRequestBody,
  OperationRequestPropertiesBody,
  OperationRequestRawBody,
} from '@moralisweb3/common-core';

// TODO: decide if we want to move this functionality to "common-api-utils", since it is a duplicate of code from "apiUtils"
export class OperationRequestBuilder<Request> {
  public constructor(
    private readonly operation: Operation<Request, unknown, unknown, unknown>,
    private readonly core: Core,
  ) {}

  public prepareUrl(baseUrl: string, relativePath: string, request: Request) {
    const urlParams = this.operation.getRequestUrlParams(request, this.core);

    let operationPath = this.operation.urlPathPattern;

    for (const paramName of this.operation.urlPathParamNames ?? []) {
      const paramValue = urlParams[paramName as string];
      if (!paramValue) {
        throw new Error(`Param ${paramName as string} is required`);
      }
      operationPath = operationPath.replace(`{${paramName as string}}`, paramValue as string);
    }

    const url = `${baseUrl}${relativePath}${operationPath}`;

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
}
