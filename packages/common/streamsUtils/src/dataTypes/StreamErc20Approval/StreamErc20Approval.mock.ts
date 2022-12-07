import { StreamErc20ApprovalInput } from './types';

const full: StreamErc20ApprovalInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  tokenDecimals: '6',
  valueWithDecimals: '0.012345',
  triggers: [
    { name: 'ownerBalance', value: '6967063534600021400000' },
    { name: 'spenderBalance', value: '200000000000000000' },
  ],
};

const noMetadata: StreamErc20ApprovalInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  owner: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  spender: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  value: '12345',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenName: '',
  tokenSymbol: '',
  tokenDecimals: '',
  valueWithDecimals: undefined,
};

export const mockStreamErc20Approval = {
  FULL: full,
  NO_METADATA: noMetadata,
};
