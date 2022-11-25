import {
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
} from '@moralisweb3/common-core';

export interface ApiBackendAdapter {
  requestOperation<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse>>;

  requestNullableOperation<Request, JSONRequest, Response, JSONResponse>(
    backendModuleName: string,
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ): Promise<ResponseAdapter<Response, JSONResponse> | null>;

  requestPaginatedOperation<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
    backendModuleName: string,
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  ): Promise<PaginatedResponseAdapter<Response, JSONResult>>;
}
