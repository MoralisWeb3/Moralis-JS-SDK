import { StreamTriggerInput } from './types';

const balanceOfAbi = {
  constant: true,
  inputs: [
    {
      name: 'owner',
      type: 'address',
    },
  ],
  name: 'balanceOf',
  outputs: [
    {
      name: 'toBalance',
      type: 'uint256',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
};

const allowanceAbi = {
  constant: true,
  inputs: [
    {
      name: 'owner',
      type: 'address',
    },
    {
      name: 'spender',
      type: 'address',
    },
  ],
  name: 'balanceOf',
  outputs: [
    {
      name: 'remaining',
      type: 'uint256',
    },
  ],
  payable: false,
  stateMutability: 'view',
  type: 'function',
};

const erc20TransferTrigger: StreamTriggerInput = {
  type: 'erc20transfer',
  contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  functionAbi: balanceOfAbi,
  inputs: ['$to'],
};

const allowanceTrigger: StreamTriggerInput = {
  type: 'erc20transfer',
  contractAddress: '$contract',
  functionAbi: allowanceAbi,
  inputs: [['$from', '$to']],
};

export const mockStreamTrigger = {
  ERC20_TRANSFER: erc20TransferTrigger,
  ALLOWANCE_SELECTORS: allowanceTrigger,
};
