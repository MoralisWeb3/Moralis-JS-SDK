import {
  Operation,
  PaginatedOperation,
  PaginatedRequest,
  PaginatedResponseAdapter,
  ResponseAdapter,
} from '@moralisweb3/common-core';

export interface ClientRequestHandler {
  handle: <Request, JSONRequest, Response, JSONResponse>(
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) => Promise<ResponseAdapter<Response, JSONResponse>>;

  handleNullable: <Request, JSONRequest, Response, JSONResponse>(
    request: Request,
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) => Promise<ResponseAdapter<Response, JSONResponse> | null>;

  handlePaginated: <Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
    request: Request,
    operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  ) => Promise<PaginatedResponseAdapter<Response, JSONResult>>;
}
