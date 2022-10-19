import { Operation } from './Operation';

export interface PaginatedRequest {
  offset?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedJSONResponse<JSONResult> {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: JSONResult;
}

export interface PaginatedOperation<Request extends PaginatedRequest, JSONRequest, Result, JSONResult>
  extends Operation<Request, JSONRequest, Result, PaginatedJSONResponse<JSONResult>> {}
