import { ApiErrorCode, MoralisApiError } from '@moralisweb3/core';
import { PaginatedParams, PaginatedResult } from '../resolvers/PaginatedEndpoint';

export const tryGetNextPageParams = <Params extends PaginatedParams>(
  firstPageIndex: number,
  currentParams: Params,
  result: PaginatedResult<unknown>,
) => {
  if (firstPageIndex !== 0 && firstPageIndex !== 1) {
    throw new MoralisApiError({
      message: 'Not supported firstPageIndex. Value can only be 0 or 1',
      code: ApiErrorCode.NOT_IMPLEMENTED,
    });
  }

  const currentPage = firstPageIndex === 1 ? result.page : result.page + 1;
  const hasNextPage = result.total > result.page_size * currentPage;
  if (!hasNextPage) {
    return null;
  }

  const nextParams = { ...currentParams };
  if (result.cursor) {
    nextParams.cursor = result.cursor;
  } else {
    nextParams.offset = (result.page + 1) * (nextParams.limit || 500);
  }
  return nextParams;
};
