import { PaginatedJSONResponse } from '@moralisweb3/core';

export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  cursor?: string;
}

export function readPagination(jsonResponse: PaginatedJSONResponse<unknown>): Pagination {
  return {
    page: jsonResponse.page ?? 0,
    pageSize: jsonResponse.page_size ?? 0,
    total: jsonResponse.total ?? 0,
    cursor: jsonResponse.cursor,
  };
}
