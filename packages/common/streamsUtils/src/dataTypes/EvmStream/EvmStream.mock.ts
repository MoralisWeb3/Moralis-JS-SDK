import { EvmStreamInput } from './types';

const simple: EvmStreamInput = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  includeAllTxLogs: false,
  abi: null,
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
  advancedOptions: null,
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  triggers: [
    {
      type: 'erc20transfer',
      contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
      functionAbi: {},
      inputs: ['$to'],
    },
  ],
};

const advancedOptions: EvmStreamInput = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  topic0: ['Transfer(address,address,uint256)'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  includeAllTxLogs: false,
  abi: [
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'tokenId', type: 'uint256' },
      ],
      name: 'Transfer',
      type: 'event',
    },
  ],
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
  advancedOptions: [
    {
      topic0: 'Transfer(address,address,uint256)',
      filter: {
        eq: ['tokenId', '1'],
      },
      includeNativeTxs: true,
    },
  ],
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
};

const getNativeBalances: EvmStreamInput = {
  webhookUrl: 'https://webhook.site/c76c6361-960d-4600-8498-9fecba8abb5f',
  description: 'mock response',
  tag: 'tag',
  topic0: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'],
  allAddresses: false,
  includeNativeTxs: false,
  includeContractLogs: false,
  includeInternalTxs: false,
  includeAllTxLogs: false,
  abi: null,
  chainIds: ['0x3', '0x4'],
  status: 'active',
  statusMessage: 'Stream is active',
  advancedOptions: null,
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  triggers: [],
  getNativeBalances: [
    {
      selectors: ['$fromAddress', '$toAddress'],
      type: 'tx',
    },
  ],
};

export const mockEvmStream = {
  SIMPLE: simple,
  ADVANCED_OPTIONS: advancedOptions,
  GET_NATIVE_BALANCES: getNativeBalances,
};
