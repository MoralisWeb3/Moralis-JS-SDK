const defaultMockAptosAuth = {
  id: 'fRyt67D3eRss3RrX',
  domain: 'defi.finance',
  statement: 'Please confirm',
  uri: 'https://defi.finance/',
  expirationTime: '2020-01-01T00:00:00.000Z',
  notBefore: '2020-01-01T00:00:00.000Z',
  resources: ['https://docs.moralis.io/'],
  version: '1.0',
  nonce: '0x1234567890abcdef0123456789abcdef1234567890abcdef',
  profileId: '0xbfbcfab169c67072ff418133124480fea02175f1402aaa497daa4fd09026b0e1',
  chainId: '1',
  address: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
  publicKey: '0xfb2853744bb8afd58d9386d1856afd8e08de135019961dfa3a10d8c9bf83b99d',
};

export const createAptosAuthResponse = (tag: string) => ({
  ...defaultMockAptosAuth,
  tag,
});
