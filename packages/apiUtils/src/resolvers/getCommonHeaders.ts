import MoralisCore from '@moralisweb3/core';

export type Headers = { [key: string]: string };

export const getCommonHeaders = (product: string): Headers => ({
  'x-moralis-platform': `JS SDK`,
  'x-moralis-platform-version': MoralisCore.libVersion,
  'x-moralis-build-target': 'node',
  'x-moralis-product': product,
});
