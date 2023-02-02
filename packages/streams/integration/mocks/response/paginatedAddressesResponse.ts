export const paginatedAddressesResponse = (
  addresses: { address: string; id?: string }[],
  total: number,
  cursor?: string,
) => ({
  result: addresses,
  total,
  cursor,
});
