import { PaginatedParams, PaginatedResult } from '../resolvers/PaginatedEndpoint';

export const tryGetNextPageParams = <Params extends PaginatedParams>(
  currentParams: Params,
  result: PaginatedResult<unknown>,
) => {
  const hasNextPage = result.total > result.page_size * result.page;
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
