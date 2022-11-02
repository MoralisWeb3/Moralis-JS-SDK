import { PaginatedOperation, PaginatedRequest } from '../PaginatedOperation';
import { Pagination } from '../response/Pagination';

export class NextPaginatedRequestResolver {
  public static resolve<Request extends PaginatedRequest>(
    operation: PaginatedOperation<Request, unknown, unknown, unknown>,
    request: Request,
    pagination: Pagination,
  ): Request | null {
    const currentPage = operation.firstPageIndex === 1 ? pagination.page : pagination.page + 1;
    const hasNextPage = pagination.total > pagination.pageSize * currentPage;
    if (!hasNextPage) {
      return null;
    }

    const nextParams = { ...request };
    if (pagination.cursor) {
      nextParams.cursor = pagination.cursor;
    } else {
      nextParams.offset = (pagination.page + 1) * (nextParams.limit || 500);
    }
    return nextParams;
  }
}
