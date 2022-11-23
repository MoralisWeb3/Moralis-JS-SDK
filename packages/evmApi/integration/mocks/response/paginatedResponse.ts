export const createPaginatedResponse = (
  result: any[],
  total: number,
  page: number,
  pageSize: number,
  cursor?: string | null,
) => ({
  result,
  total,
  page,
  page_size: pageSize,
  cursor,
});
