import Core, { MoralisDataObject, maybe, CoreProvider, BigNumber, dateInputToDate } from '@moralisweb3/common-core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmNftTransferInput, EvmNftTransferData } from './types';

/**
 * Valid input for a new EvmNftTransfer instance.
 * This can be an existing {@link EvmNftTransfer} or a valid {@link EvmNftTransferInput} object
 */
export type EvmNftTransferish = EvmNftTransferInput | EvmNftTransfer;

/**
 * The EvmNftTransfer is a representation of a completed NFT transfer.
 *
 * @category DataType
 */
export class EvmNftTransfer implements MoralisDataObject {
  /**
   * Create a new instance of EvmNftTransfer from any valid transfer input
   * @param data - the EvmNftTransferish type
   * @example
   * ```
   * const transfer = EvmNftTransfer.create(data);
   *```
   */
  static create(data: EvmNftTransferish, core?: Core) {
    if (data instanceof EvmNftTransfer) {
      return data;
    }

    const finalCore = core ?? CoreProvider.getDefault();
    return new EvmNftTransfer(data, finalCore);
  }

  protected _data: EvmNftTransferData;

  constructor(data: EvmNftTransferInput, core: Core) {
    this._data = EvmNftTransfer.parse(data, core);
  }

  static parse = (data: EvmNftTransferInput, core: Core): EvmNftTransferData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    amount: maybe(data.amount, (amount) => +amount),
    blockNumber: BigNumber.create(data.blockNumber),
    blockTimestamp: dateInputToDate(data.blockTimestamp),
    transactionIndex: maybe(data.transactionIndex, (index) => +index),
    transactionType: maybe(data.transactionType),
    fromAddress: maybe(data.fromAddress, (address) => EvmAddress.create(address, core)),
    toAddress: EvmAddress.create(data.toAddress, core),
    tokenAddress: EvmAddress.create(data.tokenAddress, core),
    value: maybe(data.value, EvmNative.create),
    operator: maybe(data.operator, (operator) => EvmAddress.create(operator, core)),
    logIndex: +data.logIndex,
  });

  /**
   * Check the equality between two NFT transfers. The compares the chain, blockHash, tokenId and logIndex.
   * @param dataA - The first transfer to compare
   * @param dataB - The second transfer to compare
   * @example EvmNftTransfer.equals(dataA, dataB)
   * @returns true if the transfers are equal, false otherwise
   */
  static equals(dataA: EvmNftTransferish, dataB: EvmNftTransferish) {
    const transferA = EvmNftTransfer.create(dataA);
    const transferB = EvmNftTransfer.create(dataB);

    if (!transferA.chain.equals(transferB.chain)) {
      return false;
    }

    if (transferA.blockHash !== transferB.blockHash) {
      return false;
    }

    if (transferA.tokenId !== transferB.tokenId) {
      return false;
    }

    if (transferA.logIndex !== transferB.logIndex) {
      return false;
    }

    return true;
  }

  /**
   * Checks the equality of the current transfer instance with another nft transfer
   * @param data - the transfer to compare with
   * @example transaction.equals(data)
   * @returns true if the transfers are equal, false otherwise
   */
  equals(data: EvmNftTransferish): boolean {
    return EvmNftTransfer.equals(this, data);
  }

  /**
   * @returns a JSON represention of the transfer.
   * @example
   * ```
   * transfer.toJSON()
   * ```
   */
  toJSON() {
    const data = this._data;
    return {
      ...data,
      chain: data.chain.format(),
      fromAddress: data.fromAddress ? data.fromAddress.format() : undefined,
      toAddress: data.toAddress.format(),
      tokenAddress: data.tokenAddress.format(),
      value: data.value ? data.value.format() : undefined,
      operator: data.operator ? data.operator.format() : undefined,
      blockNumber: data.blockNumber.toString(),
    };
  }

  /**
   * @returns a JSON represention of the transfer.
   * @example
   * ```
   * transfer.format()
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * @returns all the data without casting it to JSON.
   * @example transfer.result
   */
  get result() {
    return this._data;
  }

  /**
   * @returns the chain of the transfer.
   * @example transfer.chain // EvmChain
   */
  get chain() {
    return this._data.chain;
  }

  /**
   * @returns the block hash of the transfer.
   * @example transfer.blockHash // "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e"
   */
  get blockHash() {
    return this._data.blockHash;
  }

  /**
   * @returns the block number of the transfer.
   * @example transfer.blockNumber // BigNumber
   */
  get blockNumber() {
    return this._data.blockNumber;
  }

  /**
   * @returns the block timestamp of the transfer.
   * @example transfer.blockTimestamp // Date
   */
  get blockTimestamp() {
    return this._data.blockTimestamp;
  }

  /**
   * @returns the from address of the transfer.
   * @example transfer.fromAddress // EvmAddress
   */
  get fromAddress() {
    return this._data.fromAddress;
  }

  /**
   * @returns the to address of the transfer.
   * @example transfer.toAddress // EvmAddress
   */
  get toAddress() {
    return this._data.toAddress;
  }

  /**
   * @returns the token address of the transfer.
   * @example transfer.tokenAddress // EvmAddress
   */
  get tokenAddress() {
    return this._data.tokenAddress;
  }

  /**
   * @returns the token id of the transfer.
   * @example transfer.tokenId // "15"
   */
  get tokenId() {
    return this._data.tokenId;
  }

  /**
   * @returns the amount of the transfer.
   * @example transfer.amount // 1
   */
  get amount() {
    return this._data.amount;
  }

  /**
   * @returns the value of the transfer.
   * @example transfer.value // EvmNative
   */
  get value() {
    return this._data.value;
  }

  /**
   * @returns the log index of the transfer.
   * @example transfer.logIndex // 0
   */
  get logIndex() {
    return this._data.logIndex;
  }

  /**
   * @returns the transaction hash of the transfer.
   * @example transfer.transactionHash // "0x057Ec652A4F150f7FF94f089A38008f49a0DF88e"
   */
  get transactionHash() {
    return this._data.transactionHash;
  }

  /**
   * @returns the transaction index of the transfer.
   * @example transfer.transactionIndex // 123
   */
  get transactionIndex() {
    return this._data.transactionIndex;
  }

  /**
   * @returns the transaction type of the transfer.
   * @example transfer.transactionType // "1"
   */
  get transactionType() {
    return this._data.transactionType;
  }

  /**
   * @returns the operator of the transfer.
   * @example transfer.operator // EvmAddress
   */
  get operator() {
    return this._data.operator;
  }

  /**
   * @returns the contract type of the transfer.
   * @example transfer.contractType // "ERC721"
   */
  get contractType() {
    return this._data.contractType;
  }

  /**
   * @returns possibility of the token being a spam token
   * @example transfer.possibleSpam // true
   */
  get possibleSpam() {
    return this._data.possibleSpam;
  }
}
