import { PaginatedJSONResponse } from '../PaginatedOperation';
import { Pagination } from './Pagination';

export class PaginationReader {
  public static read(jsonResponse: PaginatedJSONResponse<unknown>): Pagination {
    return {
      page: jsonResponse.page ?? 0,
      pageSize: jsonResponse.page_size ?? 0,
      total: jsonResponse.total ?? 0,
      cursor: jsonResponse.cursor,
    };
  }
}
