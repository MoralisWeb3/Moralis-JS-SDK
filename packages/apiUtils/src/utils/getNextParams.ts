import { PaginatedParams, PaginatedResult } from '../resolvers/PaginatedEndpoint';

export const getNextParams = <Options extends PaginatedParams>(params: Options, data: PaginatedResult<unknown>) => {
  const nextParams = { ...params };
  if (data.total > data.page_size * (data.page + 1)) {
    data.cursor ? (nextParams.cursor = data.cursor) : (nextParams.offset = (data.page + 1) * (nextParams.limit || 500));
  }

  return nextParams;
};
