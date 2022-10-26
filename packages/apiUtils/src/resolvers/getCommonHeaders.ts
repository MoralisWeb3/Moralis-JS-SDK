import Core from '@moralisweb3/common-core';

export type Headers = { [key: string]: string };

export const getCommonHeaders = (): Headers => ({
  'x-moralis-platform': 'JS SDK',
  'x-moralis-platform-version': Core.libVersion,
  'x-moralis-build-target': 'node',
});
