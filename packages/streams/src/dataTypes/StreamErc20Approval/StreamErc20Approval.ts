import MoralisCore, { MoralisCoreProvider, MoralisDataObject } from '@moralisweb3/core';
import { Erc20Token, Erc20Value, EvmAddress, EvmChain } from '@moralisweb3/evm-utils';
import { StreamErc20ApprovalData, StreamErc20ApprovalInput } from './types';

export type StreamErc20Approvalish = StreamErc20ApprovalInput | StreamErc20Approval;

/**
 * The StreamErc20Approval class is representation of the webhook data that is returned from the Stream api
 *
 * @category DataType
 */
export class StreamErc20Approval implements MoralisDataObject {
  /**
   * Create a new instance of StreamErc20Approval
   *
   * @param data - the StreamErc20Approvalish type
   * @param core - the MoralisCore instance
   * @example
   * ```ts
   * const erc20Approval = StreamErc20Approval.create(data);
   * ```
   * @returns an instance of StreamErc20Approval
   */
  static create(data: StreamErc20Approvalish, core?: MoralisCore) {
    if (data instanceof StreamErc20Approval) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamErc20Approval(data, finalCore);
  }

  private _data: StreamErc20ApprovalData;

  constructor(data: StreamErc20ApprovalInput, core: MoralisCore) {
    this._data = StreamErc20Approval.parse(data, core);
  }

  static parse = (data: StreamErc20ApprovalInput, core: MoralisCore): StreamErc20ApprovalData => {
    const chain = EvmChain.create(data.chain, core);
    return {
      ...data,
      chain,
      spender: EvmAddress.create(data.spender, core),
      owner: EvmAddress.create(data.owner, core),
      logIndex: +data.logIndex,
      tokenValue: Erc20Value.create(data.value, {
        decimals: data.token.decimals,
        token: { chain, ...data.token },
      }),
      token: Erc20Token.create({ chain: data.chain, ...data.token }, core),
    };
  };

  /**
   * Compares two StreamErc20Approval data. It checks a deep equality check of both values.
   * @param valueA - the first StreamErc20Approvalish data to compare
   * @param valueB - the second StreamErc20Approvalish data to compare
   * @returns true if the values are equal, false otherwise
   * @example
   * ```ts
   *  StreamErc20Approval.equals(valueA, valueB);
   * ```
   */
  static equals(valueA: StreamErc20Approvalish, valueB: StreamErc20Approvalish) {
    const erc20ApprovalA = StreamErc20Approval.create(valueA);
    const erc20ApprovalB = StreamErc20Approval.create(valueB);

    // Since we have no specific keys to check comparisons for and the result contains many datapoints, we do a
    // deep equality check
    return JSON.stringify(erc20ApprovalA._data) === JSON.stringify(erc20ApprovalB._data);
  }

  /**
   * Compares an StreamErc20Approvalish data to this StreamErc20Approval instance.
   * @param value - the value to compare
   * @returns true if the value is equal to the current instance, false otherwise
   * @example
   * ```ts
   * erc20Approval.equals(value);
   * ```
   */
  equals(value: StreamErc20Approvalish): boolean {
    return StreamErc20Approval.equals(this, value);
  }

  /**
   * Converts the StreamErc20Approval instance to a JSON object.
   * @returns JSON object of the StreamErc20Approval instance
   * @example `erc20Approval.toJSON()`
   */
  toJSON() {
    const { tokenValue, token, ...data } = this._data;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return {
      ...data,
      chain: data.chain.format(),
      owner: data.owner.format(),
      spender: data.spender.format(),
      valueWithDecimals: tokenValue.format(),
      tokenDecimals: token.decimals,
      tokenName: token.name,
      tokenSymbol: token.symbol,
      contract: token.contractAddress.format(),
    };
  }

  /**
   * Converts the StreamErc20Approval instance to a JSON object.
   * @returns JSON object of the StreamErc20Approval instance
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

  get owner() {
    return this._data.owner;
  }

  get spender() {
    return this._data.spender;
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
