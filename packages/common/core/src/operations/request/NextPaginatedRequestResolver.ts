import { PaginatedRequest } from '../PaginatedOperation';
import { Pagination } from '../response/Pagination';

export class NextPaginatedRequestResolver {
  public static resolve<Request extends PaginatedRequest>(
    firstPageIndex: number,
    request: Request,
    pagination: Pagination,
  ): Request | null {
    if (pagination.cursor) {
      return { ...request, cursor: pagination.cursor };
    }

    if (typeof pagination.total === 'number') {
      const currentPage = firstPageIndex === 1 ? pagination.page : pagination.page + 1;
      const hasNextPage = pagination.total > pagination.pageSize * currentPage;
      if (hasNextPage) {
        const offset = (pagination.page + 1) * (request.limit || 500);
        return { ...request, offset };
      }
    }

    return null;
  }
}
