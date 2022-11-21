const defaultMockEvmApi = {
  token_address: '0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09',
  name: 'KryptoKitties',
  synced_at: 'string',
  symbol: 'RARI',
  contract_type: 'ERC721',
};

export const createEvmApiResponse = (tag: string) => ({
  ...defaultMockEvmApi,
  tag,
});

export const createPaginatedEvmApiResponse = (tags: string[], total: number, cursor?: string) => ({
  result: tags.map((tag) => ({ ...defaultMockEvmApi, tag })),
  total,
  cursor,
});
