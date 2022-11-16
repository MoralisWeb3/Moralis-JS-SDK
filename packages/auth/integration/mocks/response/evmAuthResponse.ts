const defaultMockEvmAuth = {
  id: 'fRyt67D3eRss3RrX',
  domain: 'defi.finance',
  chainId: '1',
  address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  statement: 'Please confirm',
  uri: 'https://defi.finance/',
  expirationTime: '2020-01-01T00:00:00.000Z',
  notBefore: '2020-01-01T00:00:00.000Z',
  resources: ['https://docs.moralis.io/'],
  version: '1.0',
  nonce: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
  profileId: '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
};

export const createEvmAuthResponse = (tag: string) => ({
  ...defaultMockEvmAuth,
  tag,
});

export const createPaginatedEvmAuthResponse = (tags: string[], total: number, cursor?: string) => ({
  result: tags.map((tag) => ({ ...defaultMockEvmAuth, tag })),
  total,
  cursor,
});
