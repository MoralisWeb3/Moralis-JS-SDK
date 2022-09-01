import MoralisCore, { MoralisDataObject, BigNumber, dateInputToDate, MoralisCoreProvider } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmTransaction } from '../EvmTransaction';
import { EvmBlockInput, EvmBlockData } from './types';

export type EvmBlockish = EvmBlockInput | EvmBlock;

export class EvmBlock implements MoralisDataObject {
  private _data: EvmBlockData;

  constructor(data: EvmBlockInput, core: MoralisCore) {
    this._data = EvmBlock.parse(data, core);
  }

  static parse = (data: EvmBlockInput, core: MoralisCore): EvmBlockData => ({
    ...data,
    miner: EvmAddress.create(data.miner, core),
    timestamp: dateInputToDate(data.timestamp),
    number: BigNumber.create(data.number),
    difficulty: BigNumber.create(data.difficulty),
    totalDifficulty: BigNumber.create(data.totalDifficulty),
    size: BigNumber.create(data.size),
    gasLimit: BigNumber.create(data.gasLimit),
    gasUsed: BigNumber.create(data.gasUsed),
    transactions: data.transactions.map((transaction) => EvmTransaction.create(transaction, core)),
    chain: EvmChain.create(data.chain, core),
    transactionCount: +data.transactionCount,
  });

  static create(data: EvmBlockish, core?: MoralisCore) {
    if (data instanceof EvmBlock) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmBlock(data, finalCore);
  }

  static equals(dataA: EvmBlockish, dataB: EvmBlockish) {
    const blockA = EvmBlock.create(dataA);
    const blockB = EvmBlock.create(dataB);

    if (!blockA._data.chain.equals(blockB._data.chain)) {
      return false;
    }

    if (blockA._data.hash !== blockB._data.hash) {
      return false;
    }

    return true;
  }

  equals(data: EvmBlockish): boolean {
    return EvmBlock.equals(this, data);
  }

  toJSON() {
    const data = this._data;
    return {
      ...data,
      number: data.number.toString(),
      difficulty: data.difficulty.toString(),
      totalDifficulty: data.totalDifficulty.toString(),
      size: data.size.toString(),
      gasLimit: data.gasLimit.toString(),
      gasUsed: data.gasUsed.toString(),
      chain: data.chain.format(),
      miner: data.miner.format(),
      transactions: data.transactions.map((transaction) => transaction.toJSON()),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._data;
  }
}
