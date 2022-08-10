import { BigNumber, BigNumberish, DateInput } from '@moralisweb3/core';
import { EvmAddressish, EvmAddress } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { EvmTransaction, EvmTransactionish } from '../EvmTransaction';

export interface EvmBlockInput {
  timestamp: DateInput;
  number: BigNumberish;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: EvmAddressish;
  difficulty: BigNumberish;
  totalDifficulty: BigNumberish;
  size: BigNumberish;
  extraData: string;
  gasLimit: BigNumberish;
  gasUsed: BigNumberish;
  transactionCount: number | string;
  transactions: EvmTransactionish[];
  chain: EvmChainish;
}

export interface EvmBlockData {
  timestamp: Date;
  number: BigNumber;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: EvmAddress;
  difficulty: BigNumber;
  totalDifficulty: BigNumber;
  size: BigNumber;
  extraData: string;
  gasLimit: BigNumber;
  gasUsed: BigNumber;
  transactionCount: number;
  transactions: EvmTransaction[];
  chain: EvmChain;
}
