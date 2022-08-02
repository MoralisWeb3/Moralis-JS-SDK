export type Headers = { [key: string]: string };

export const getCommonHeaders = (libVersion: string): Headers => ({
  'x-moralis-platform': 'JS SDK',
  'x-moralis-platform-version': libVersion,
  'x-moralis-build-target': 'node',
});
