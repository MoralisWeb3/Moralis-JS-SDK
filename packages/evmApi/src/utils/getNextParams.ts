import { PaginatedOptions, PaginatedResponse } from "../resolvers/PaginatedResolver";

export const getNextParams = <T extends PaginatedOptions, I>(params: T, data: Partial<PaginatedResponse<I>>) => {
  const nextParams = params;
  if (!data.page_size || !data.total || data.page === undefined) return params;
  if (data.cursor) {
    if (data.total > data.page_size * (data.page + 1)) nextParams.cursor = data.cursor;
  } else {
    if (data.total > data.page_size * (data.page + 1)) {
      nextParams.offset = (data.page + 1) * (nextParams.limit || 500);
    }
  }

  return nextParams;
};
