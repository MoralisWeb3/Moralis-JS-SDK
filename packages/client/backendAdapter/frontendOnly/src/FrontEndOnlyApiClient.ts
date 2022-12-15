import { ApiClient } from '@moralisweb3/client-backend-adapter-utils';
import {
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
} from '@moralisweb3/common-core';

export class FrontEndOnlyApiClient implements ApiClient {
  public async request<Request, JSONRequest, Response, JSONResponse>(
    _: string,
    __: Request,
    ___: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public async requestNullable<Request, JSONRequest, Response, JSONResponse>(
    _: string,
    __: Request,
    ___: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }

  public async requestPaginated<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>(
    _: string,
    __: Request,
    ___: PaginatedOperation<Request, JSONRequest, Result, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Result, JSONResult>> {
    // TODO: axios
    throw new Error('Method not implemented.');
  }
}
