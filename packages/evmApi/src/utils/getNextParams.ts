import { PaginatedOptions, PaginatedResponse } from '../resolvers/PaginatedResolver';

export const getNextParams = <Options extends PaginatedOptions>(params: Options, data: PaginatedResponse<unknown>) => {
  const nextParams = { ...params };
  if (data.total > data.page_size * (data.page + 1)) {
    data.cursor ? (nextParams.cursor = data.cursor) : (nextParams.offset = (data.page + 1) * (nextParams.limit || 500));
  }

  return nextParams;
};
