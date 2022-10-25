import MoralisCore, { MoralisDataObject, BigNumber, dateInputToDate, MoralisCoreProvider } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmTransaction } from '../EvmTransaction';
import { EvmSimpleBlock, EvmSimpleBlockish } from './EvmSimpleBlock';
import { EvmBlockInput, EvmBlockData } from './types';

/**
 * Valid input for a new EvmBlock instance.
 * This can be an existing {@link EvmBlock} or a valid {@link EvmBlockInput} object
 */
export type EvmBlockish = EvmBlockInput | EvmBlock;

/**
 * The EvmBlock is a representation of a block.
 *
 * @category DataType
 */
export class EvmBlock implements MoralisDataObject {
  /**
   * Create a new instance of EvmBlock from any valid transaction input
   * @param data - the EvmBlockish type
   * @example const transaction = EvmTransaction.create(data);
   */
  static create(data: EvmBlockish, core?: MoralisCore) {
    if (data instanceof EvmBlock) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new EvmBlock(data, finalCore);
  }

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

  /**
   * Check the equality between two Evm blocks. It compares their hashes and blocks.
   * @param dataA - The first block to compare
   * @param dataB - The second block to compare
   * @example EvmTransaction.equals(dataA, dataB)
   */
  static equals(dataA: EvmSimpleBlockish | EvmBlockish, dataB: EvmSimpleBlockish | EvmBlockish) {
    const blockA = EvmSimpleBlock.create(dataA);
    const blockB = EvmSimpleBlock.create(dataB);

    if (!blockA.chain.equals(blockB.chain)) {
      return false;
    }

    if (blockA.hash !== blockB.hash) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current block with another evm block
   * @param data - the block to compare with
   * @example
   * ```ts
   * block.equals(data)
   * ```
   */
  equals(data: EvmBlockish): boolean {
    return EvmBlock.equals(this, data);
  }

  /**
   * @returns a JSON represention of the block.
   * @example
   * ```
   * block.toJSON()
   * ```
   */
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

  /**
   * @returns a JSON represention of the block.
   * @example
   * ```
   * block.format()
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example block.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the block number.
   * @example block.number // BigNumber
   */
  get number() {
    return this._data.number;
  }

  /**
   * @returns the block hash.
   * @example block.hash // "0x9b559aef7ea858608c2e554246fe4a24287e7aeeb976848df2b9a2531f4b9171"
   */
  get hash() {
    return this._data.hash;
  }

  /**
   * @returns the block timestamp.
   * @example block.timestamp // Date
   */
  get timestamp() {
    return this._data.timestamp;
  }

  /**
   * @returns the block miner.
   * @example block.miner // EvmAddress
   */
  get miner() {
    return this._data.miner;
  }

  /**
   * @returns the block difficulty.
   * @example block.difficulty // BigNumber
   */
  get difficulty() {
    return this._data.difficulty;
  }

  /**
   * @returns the block total difficulty.
   * @example block.totalDifficulty // BigNumber
   */
  get totalDifficulty() {
    return this._data.totalDifficulty;
  }

  /**
   * @returns the block size.
   * @example block.size // BigNumber
   */
  get size() {
    return this._data.size;
  }

  /**
   * @returns the block gas limit.
   * @example block.gasLimit // BigNumber
   */
  get gasLimit() {
    return this._data.gasLimit;
  }

  /**
   * @returns the block gas used.
   * @example block.gasUsed // BigNumber
   */
  get gasUsed() {
    return this._data.gasUsed;
  }

  /**
   * @returns the block transactions.
   * @example block.transactions // EvmTransaction[]
   */
  get transactions() {
    return this._data.transactions;
  }

  /**
   * @returns the block chain.
   * @example block.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the block transaction count.
   * @example block.transactionCount // 252
   */
  get transactionCount() {
    return this._data.transactionCount;
  }

  /**
   * @returns the block transactions root.
   * @example block.transactionsRoot // "0xe4c7bf3aff7ad07f9e80d57f7189f0252592fee6321c2a9bd9b09b6ce0690d27"
   */
  get transactionsRoot() {
    return this._data.transactionsRoot;
  }

  /**
   * @returns the block state root.
   * @example block.stateRoot // "0x49e3bfe7b618e27fde8fa08884803a8458b502c6534af69873a3cc926a7c724b"
   */
  get stateRoot() {
    return this._data.stateRoot;
  }

  /**
   * @returns the block receipts root.
   * @example block.receiptsRoot // "0x7cf43d7e837284f036cf92c56973f5e27bdd253ca46168fa195a6b07fa719f23"
   */
  get receiptsRoot() {
    return this._data.receiptsRoot;
  }

  /**
   * @returns the block logs bloom.
   * @example block.logsBloom // "0xdde5fc46c5d8bcbd58207bc9f267bf43298e23791a326ff02661e99790da9996b3e0dd912c0b8202d389d282c56e4d11eb2dec4898a32b6b165f1f4cae6aa0079498eab50293f3b8defbf6af11bb75f0408a563ddfc26a3323d1ff5f9849e95d5f034d88a757ddea032c75c00708c9ff34d2207f997cc7d93fd1fa160a6bfaf62a54e31f9fe67ab95752106ba9d185bfdc9b6dc3e17427f844ee74e5c09b17b83ad6e8fc7360f5c7c3e4e1939e77a6374bee57d1fa6b2322b11ad56ad0398302de9b26d6fbfe414aa416bff141fad9d4af6aea19322e47595e342cd377403f417dfd396ab5f151095a5535f51cbc34a40ce9648927b7d1d72ab9daf253e31daf"
   */
  get logsBloom() {
    return this._data.logsBloom;
  }

  /**
   * @returns the block extra data.
   * @example block.extraData // "0x65746865726d696e652d6575726f70652d7765737433"
   */
  get extraData() {
    return this._data.extraData;
  }

  /**
   * @returns the block parent hash.
   * @example block.parentHash // "0x011d1fc45839de975cc55d758943f9f1d204f80a90eb631f3bf064b80d53e045"
   */
  get parentHash() {
    return this._data.parentHash;
  }

  /**
   * @returns the block sha3Uncles.
   * @example block.sha3Uncles // "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347"
   */
  get sha3Uncles() {
    return this._data.sha3Uncles;
  }

  /**
   * @returns the block nonce.
   * @example block.nonce // "0xedeb2d8fd2b2bdec"
   */
  get nonce() {
    return this._data.nonce;
  }
}
