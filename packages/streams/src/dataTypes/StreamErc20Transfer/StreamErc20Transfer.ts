import MoralisCore, { MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { Erc20Token, Erc20Value, EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { StreamErc20TransferData, StreamErc20TransferInput } from './types';

type StreamErc20Transferish = StreamErc20Transfer | StreamErc20TransferInput;

// TODO: combine with Erc20Transfer class (there are some difference in the input types currently)
export class StreamErc20Transfer implements MoralisDataObject {
  static create(data: StreamErc20Transferish, core?: MoralisCore) {
    if (data instanceof StreamErc20Transfer) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamErc20Transfer(data, finalCore);
  }

  private _data: StreamErc20TransferData;

  constructor(data: StreamErc20TransferInput, core: MoralisCore) {
    this._data = StreamErc20Transfer.parse(data, core);
  }

  static parse = (data: StreamErc20TransferInput, core: MoralisCore): StreamErc20TransferData => ({
    ...data,
    chain: EvmChain.create(data.chain, core),
    from: EvmAddress.create(data.from, core),
    to: EvmAddress.create(data.to, core),
    logIndex: +data.logIndex,
    tokenValue: Erc20Value.create(data.value, {
      decimals: data.token.decimals,
      token: { chain: data.chain, ...data.token },
    }),
    token: Erc20Token.create({ chain: data.chain, ...data.token }, core),
  });

  /**
   * Compares two StreamErc20Transfer data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc20Transferish data to compare
   * @param valueB - the second StreamErc20Transferish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc20Transfer.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc20Transferish, valueB: StreamErc20Transferish) {
    const erc20ApprovalA = StreamErc20Transfer.create(valueA);
    const erc20ApprovalB = StreamErc20Transfer.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(erc20ApprovalA._data) === JSON.stringify(erc20ApprovalB._data);
  }

  /**
   * Compares an StreamErc20Transferish data to this StreamErc20Transfer instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * erc20Approval.equals(value);
   * ```
   */
  equals(value: StreamErc20Transferish): boolean {
    return StreamErc20Transfer.equals(this, value);
  }

  toJSON() {
    const { tokenValue, token, ...data } = this._data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      ...data,
      chain: data.chain.format(),
      from: data.from.format(),
      to: data.to.format(),
      valueWithDecimals: tokenValue.format(),
      tokenDecimals: token.decimals,
      tokenName: token.name,
      tokenSymbol: token.symbol,
      contract: token.contractAddress.format(),
    };
  }

  /**
   * Converts the StreamErc20Transfer instance to a JSON object.
   * @returns JSON object of the StreamErc20Transfer instance
   * @example `erc20Approval.format()`
   */
  format() {
    return this.toJSON();
  }

  get chain() {
    return this._data.chain;
  }

  get transactionHash() {
    return this._data.transactionHash;
  }

  get logIndex() {
    return this._data.logIndex;
  }

  get tag() {
    return this._data.tag;
  }

  get from() {
    return this._data.from;
  }

  get to() {
    return this._data.to;
  }

  get tokenValue() {
    return this._data.tokenValue;
  }

  get token() {
    return this._data.token;
  }

  get contract() {
    return this.token.contractAddress;
  }

  get tokenName() {
    return this.token.name;
  }

  get tokenSymbol() {
    return this.token.symbol;
  }

  get tokenDecimals() {
    return this.token.decimals;
  }

  get amount() {
    return this.tokenValue.amount;
  }

  get value() {
    // note that the 'value' is different thatn the token.value. tokenValue.value will format to decimals, while
    // this method returns the value as Bignumber string.
    // This is on purpose to keep in consistent with the streams api return value
    return this.tokenValue.amount.toString();
  }

  get valueWithDecimals() {
    return this.tokenValue.value;
  }
}
