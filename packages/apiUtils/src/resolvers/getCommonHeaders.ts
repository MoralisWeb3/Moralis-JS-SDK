import MoralisCore from '@moralisweb3/common-core';

export type Headers = { [key: string]: string };

export const getCommonHeaders = (): Headers => ({
  'x-moralis-platform': 'JS SDK',
  'x-moralis-platform-version': MoralisCore.libVersion,
  'x-moralis-build-target': 'node',
});
