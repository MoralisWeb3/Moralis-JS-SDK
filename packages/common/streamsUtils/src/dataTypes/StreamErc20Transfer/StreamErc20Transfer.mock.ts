import { StreamErc20TransferInput } from './types';

const full: StreamErc20TransferInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  value: '12345',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenName: 'Stream',
  tokenSymbol: 'STREAMS',
  tokenDecimals: '6',
  valueWithDecimals: '0.012345',
};

const noMetadata: StreamErc20TransferInput = {
  chain: '0x1',
  transactionHash: '0x9857d679ab331210161427d36d08c3b00e6d28c03366e9b891832ad9b5d478f7',
  logIndex: '0',
  to: '0xee010a7476bc5adc88f1befc68c3b58f27f90419',
  from: '0xbb6a28edbbaf0c7542c73212d26cc0b249da47a5',
  value: '12345',
  contract: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  tokenName: '',
  tokenSymbol: '',
  tokenDecimals: '',
  valueWithDecimals: undefined,
};

const usdc: StreamErc20TransferInput = {
  chain: '0x1',
  transactionHash: '0xe77a85ce5c0b1ca16945bc96b9f1dc2125d8e5493a1b831b073e2a8581101141',
  logIndex: '11',
  contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  from: '0x46340b20830761efd32832a74d7169b29feb9758',
  to: '0x2f197980cb2bc010a7289136a9a73432e02e39c7',
  value: '2892460000',
  tokenName: 'USD Coin',
  tokenSymbol: 'USDC',
  tokenDecimals: '6',
  valueWithDecimals: '2892.46',
};

const link: StreamErc20TransferInput = {
  chain: '0x1',
  transactionHash: '0xed7266ed93e21d9d45c1ca019842ebae0a32f334a2444a7d6f4f41d8f76b36f8',
  logIndex: '152',
  contract: '0x514910771af9ca656af840dff83e8264ecf986ca',
  from: '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
  to: '0xa68b437b38bfa3dad21915fd6513e5d8fda77574',
  value: '4856560000000000000000',
  tokenName: 'Chain Link',
  tokenSymbol: 'LINK',
  tokenDecimals: '18',
  valueWithDecimals: '4856.56',
};

export const mockStreamErc20Transfer = {
  FULL: full,
  NO_METADATA: noMetadata,
  USDC: usdc,
  LINK: link,
};
