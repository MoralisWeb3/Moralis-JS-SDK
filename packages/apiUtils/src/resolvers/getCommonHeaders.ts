import MoralisCore from '@moralisweb3/core';

export type Headers = { [key: string]: string };

export const getCommonHeaders = (integration?: string): Headers => ({
  'x-moralis-platform': `JS SDK${integration ? ` ${integration}` : ''}`,
  'x-moralis-platform-version': MoralisCore.libVersion,
  'x-moralis-build-target': 'node',
});
