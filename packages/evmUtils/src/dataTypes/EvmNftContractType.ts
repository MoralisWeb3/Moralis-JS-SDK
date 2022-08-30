import { CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';

export enum EvmNftContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export const isValidEvmContractType = (value: string): value is EvmNftContractType => {
  switch (value.toUpperCase()) {
    case EvmNftContractType.ERC1155:
      return true;
    case EvmNftContractType.ERC721:
      return true;
    default:
      return false;
  }
};

export const validateValidEvmContractType = (value: string) => {
  if (!isValidEvmContractType(value)) {
    throw new MoralisCoreError({
      code: CoreErrorCode.INVALID_ARGUMENT,
      message: 'Invalid NFT contract type provided',
    });
  }

  return value;
};
