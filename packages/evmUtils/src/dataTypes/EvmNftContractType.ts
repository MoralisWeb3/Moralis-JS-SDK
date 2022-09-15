import { CoreErrorCode, MoralisCoreError } from '@moralisweb3/core';

export enum EvmNftContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export function noramlizeEvmNftContractType(value: string): EvmNftContractType | undefined {
  if (!value) {
    return undefined;
  }

  switch (value.toUpperCase()) {
    case EvmNftContractType.ERC1155:
      return EvmNftContractType.ERC1155;
    case EvmNftContractType.ERC721:
      return EvmNftContractType.ERC721;
  }

  throw new MoralisCoreError({
    code: CoreErrorCode.INVALID_ARGUMENT,
    message: `Invalid NFT contract type provided: ${value}`,
  });
}
