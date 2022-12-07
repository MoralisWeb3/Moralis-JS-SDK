import {
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
} from '@moralisweb3/common-core';

export interface ApiClient {
  request<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>>;

  requestNullable<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null>;

  requestPaginated<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
    backendModuleName: string,
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Response, JSONResult>>;
}
