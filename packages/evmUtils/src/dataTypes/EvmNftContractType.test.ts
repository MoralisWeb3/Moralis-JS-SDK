import { noramlizeEvmNftContractType, EvmNftContractType } from './EvmNftContractType';

describe('noramlizeEvmNftContractType()', () => {
  it('returns ERC721', () => {
    expect(noramlizeEvmNftContractType('erc721')).toEqual(EvmNftContractType.ERC721);
    expect(noramlizeEvmNftContractType('ERC721')).toEqual(EvmNftContractType.ERC721);
  });

  it('returns ERC1155', () => {
    expect(noramlizeEvmNftContractType('erc1155')).toEqual(EvmNftContractType.ERC1155);
    expect(noramlizeEvmNftContractType('ERC1155')).toEqual(EvmNftContractType.ERC1155);
  });

  it('returns undefined', () => {
    expect(noramlizeEvmNftContractType('')).toEqual(undefined);
    expect(noramlizeEvmNftContractType(null as any)).toEqual(undefined);
    expect(noramlizeEvmNftContractType(undefined as any)).toEqual(undefined);
  });

  it('throws error if value is undefined', () => {
    expect(() => noramlizeEvmNftContractType('wrongErc')).toThrowError('Invalid NFT contract type provided');
  });
});
