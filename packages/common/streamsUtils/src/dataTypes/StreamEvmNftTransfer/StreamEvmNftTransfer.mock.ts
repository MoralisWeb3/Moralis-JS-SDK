import { StreamEvmNftTransferInput } from './types';

const erc721: StreamEvmNftTransferInput = {
  amount: '1',
  chain: '0x1',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  logIndex: '0',
  operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  tokenContractType: 'ERC721',
  tokenId: '123',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
};

const erc1155Mint: StreamEvmNftTransferInput = {
  amount: '1',
  chain: '0x1',
  contract: '0x392fa59cfaec248e424d929c8713e1ca97b07f50',
  from: '0x0000000000000000000000000000000000000000',
  logIndex: '23',
  operator: null,
  to: '0xb5d212f7790bc02512f07ab9e0d513a46e61b7bb',
  tokenContractType: 'ERC1155',
  tokenId: '547',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  transactionHash: '0x799ef3f2aecb8baa8293ce41e0871c854ae1d61619fa5f6d6c02a1bc865573f1',
};

const erc1155: StreamEvmNftTransferInput = {
  amount: '50',
  chain: '0x1',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  logIndex: '0',
  operator: '0xdac17f958d2ee523a2206206994597c13d831ec8',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  tokenContractType: 'ERC1155',
  tokenId: '123',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
};

const erc1155NoMetadata: StreamEvmNftTransferInput = {
  amount: '1',
  chain: '0x1',
  contract: '0xf4910c763ed4e47a585e2d34baa9a4b611ae448c',
  from: '0x295522b61890c3672d12efbff4358a6411ce996f',
  logIndex: '193',
  operator: null,
  to: '0x0ccedbd2f0fecc5fdaf9097e513f18c5da47fca2',
  tokenContractType: '',
  tokenId: '18695248361093216056580341960620438015357416757578100254028070953619306840084',
  tokenName: '',
  tokenSymbol: '',
  transactionHash: '0x2d7a1d3701d75caa5ec2165599b8fee4a0cc997e44d216d4a12a6240a4d6bc98',
};

export const mockStreamEvmNftTransferInput = {
  ERC721: erc721,
  ERC1155: erc1155,
  ERC1155_MINT: erc1155Mint,
  ERC1155_NO_METADATA: erc1155NoMetadata,
};
