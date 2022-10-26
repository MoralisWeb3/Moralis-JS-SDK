import { StreamErc1155ApprovalInput } from './types';

const full: StreamErc1155ApprovalInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  operator: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  approved: true,
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  account: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  tokenContractType: 'ERC1155',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
};

export const mockStreamErc1155Approval = {
  FULL: full,
};
