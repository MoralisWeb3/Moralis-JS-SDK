import { normalizeEvmNftContractType, EvmNftContractType } from './EvmNftContractType';

describe('normalizeEvmNftContractType()', () => {
  it('returns ERC721', () => {
    expect(normalizeEvmNftContractType('erc721')).toEqual(EvmNftContractType.ERC721);
    expect(normalizeEvmNftContractType('ERC721')).toEqual(EvmNftContractType.ERC721);
  });

  it('returns ERC1155', () => {
    expect(normalizeEvmNftContractType('erc1155')).toEqual(EvmNftContractType.ERC1155);
    expect(normalizeEvmNftContractType('ERC1155')).toEqual(EvmNftContractType.ERC1155);
  });

  it('throws error if value is undefined', () => {
    expect(() => normalizeEvmNftContractType('wrongErc')).toThrowError('Invalid NFT contract type provided');
  });
});
