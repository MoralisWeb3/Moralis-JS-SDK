export const createPaginatedResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
