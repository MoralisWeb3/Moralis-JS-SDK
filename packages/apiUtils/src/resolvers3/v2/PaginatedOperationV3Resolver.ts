import { Core } from '@moralisweb3/common-core';
import { PaginatedResponseV3 } from './PaginatedResponseV3';
import { OperationV3 } from '../OperationV3';
import { BaseUrlOrResolver, OperationV3Resolver } from '../OperationV3Resolver';
import { PaginatedResponseV3Adapter, PaginatedResponseV3AdapterNextHandler } from './PaginatedResponseV3Adapter';

export class PaginatedOperationV3Resolver<
  Request,
  RequestJSON,
  Response extends PaginatedResponseV3<Response['result']>,
  ResponseJSON,
  Body,
  BodyJSON,
> {
  private readonly resolver: OperationV3Resolver<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>;

  public constructor(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>,
    baseUrl: BaseUrlOrResolver<Request>,
    core: Core,
  ) {
    this.resolver = new OperationV3Resolver(operation, baseUrl, core);
  }

  /**
   * @deprecated This method is dedicated to V2 API only.
   */
  public async fetch(request: Request, body: Body): Promise<PaginatedResponseV3Adapter<Response, ResponseJSON>> {
    const data = await this.resolver.request(request, body);

    let nextHandler: PaginatedResponseV3AdapterNextHandler<Response, ResponseJSON> | null = null;
    if (data.response.cursor) {
      nextHandler = async () => {
        const nextRequest = { ...request, cursor: data.response.cursor };
        return this.fetch(nextRequest, body);
      };
    }

    return new PaginatedResponseV3Adapter(data.response, data.responseJson, nextHandler);
  }
}
