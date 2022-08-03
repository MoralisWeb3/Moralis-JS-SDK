import { CoreErrorCode, MoralisCoreError, MoralisDataObject, maybe, BigNumber } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmNative } from '../EvmNative';
import { EvmTransactionReceipt } from '../EvmTransactionReceipt/EvmTransactionReceipt';
import { EvmTransactionResponseData, EvmTransactionResponseInput } from './EvmTransactionResponseTypes';

export type EvmTransactionResponseish = EvmTransactionResponseInput | EvmTransactionResponse;

/**
 * The EvmTransaction class is a MoralisData that references an Evm transaction response,
 * that has been sent to the network.
 *
 * @see EvmTransaction for an unpublished transaction that has to be sent to to the network
 * @see EvmTransactionReceipt for a confirmed transaction
 */
export class EvmTransactionResponse implements MoralisDataObject {
  private _value: EvmTransactionResponseData;
  private _resolveCall;

  receipt: EvmTransactionReceipt | null = null;

  constructor(
    value: EvmTransactionResponseInput,
    resolveCall?: (tx: EvmTransactionResponse, confirmations?: number) => Promise<EvmTransactionReceipt>,
  ) {
    this._value = EvmTransactionResponse.parse(value);
    this._resolveCall = resolveCall;
  }

  static create(
    value: EvmTransactionResponseish,
    resolveCall?: (tx: EvmTransactionResponse, confirmations?: number) => Promise<EvmTransactionReceipt>,
  ) {
    if (value instanceof EvmTransactionResponse) {
      return value;
    }

    return new EvmTransactionResponse(value, resolveCall);
  }

  static parse(value: EvmTransactionResponseInput): EvmTransactionResponseData {
    return {
      hash: value.hash,
      nonce: BigNumber.create(value.nonce || 0), // TODO: what if nonce is empty? should be zero?
      chain: EvmChain.create(value.chain),

      from: EvmAddress.create(value.from),
      to: maybe(value.to, EvmAddress.create),
      value: maybe(value.value, (val) => EvmNative.create(val, 'wei')),

      confirmations: maybe(value.confirmations),
      blockNumber: maybe(value.blockNumber),
      blockHash: maybe(value.blockHash),
      blockTimestamp: maybe(value.blockTimestamp, (value) => (value instanceof Date ? value : new Date(value))),

      gasLimit: maybe(value.gasLimit, BigNumber.create),
      gasPrice: maybe(value.gasPrice, BigNumber.create),

      data: maybe(value.data),

      type: maybe(value.type),

      maxPriorityFeePerGas: maybe(value.maxPriorityFeePerGas, BigNumber.create),
      maxFeePerGas: maybe(value.maxFeePerGas, BigNumber.create),
    };
  }

  static equals(valueA: EvmTransactionResponseish, valueB: EvmTransactionResponseish) {
    const transactionResponseA = EvmTransactionResponse.create(valueA);
    const transactionResponseB = EvmTransactionResponse.create(valueB);

    if (!transactionResponseA._value.chain.equals(transactionResponseB._value.chain)) {
      return false;
    }

    if (transactionResponseA._value.blockNumber !== transactionResponseB._value.blockNumber) {
      return false;
    }

    if (transactionResponseA._value.hash !== transactionResponseB._value.hash) {
      return false;
    }

    return true;
  }

  equals(value: EvmTransactionResponseish): boolean {
    return EvmTransactionResponse.equals(this, value);
  }

  wait = async (confirmations = 1) => {
    if (!this._resolveCall) {
      throw new MoralisCoreError({
        code: CoreErrorCode.METHOD_FAILED,
        message: 'Cannot send transaction, no supported call method provided',
      });
    }

    try {
      const receipt = await this._resolveCall(this, confirmations);
      this.receipt = receipt;
      return receipt;
    } catch (error: unknown) {
      let message = `Failed waiting for transaction confirmation.`;

      if (error instanceof Error) {
        // TODO: better error casting
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ethError: any = error;
        const details: Record<string, unknown> = {};

        if (ethError.reason) {
          message += ` Reason: ${ethError.reason}`;
          details.reason = ethError.reason;
        }
        if (ethError.cancelled) {
          details.cancelled = ethError.cancelled;
        }
        if (ethError.replacement) {
          details.replacement = ethError.replacement;
        }
        if (ethError.receipt) {
          details.receipt = ethError.receipt;
        }

        throw new MoralisCoreError({
          code: CoreErrorCode.METHOD_FAILED,
          message: message,
          cause: error,
          details,
        });
      }

      throw new MoralisCoreError({
        code: CoreErrorCode.METHOD_FAILED,
        message: message,
      });
    }
  };

  toJSON() {
    const value = this._value;
    return {
      ...value,
      nonce: value.nonce.toString(),
      chain: value.chain.format(),
      from: value.from.format(),
      to: value.from?.format(),
      value: value.value.toString(),
      gasLimit: value.gasLimit?.toString() ?? null,
      gasPrice: value.gasPrice?.toString() ?? null,
      maxPriorityFeePerGas: value.maxPriorityFeePerGas?.toString(),
      maxFeePerGas: value.maxFeePerGas?.toString(),
    };
  }

  format() {
    return this._value.hash;
  }

  get exporerUrl() {
    return this._value.chain.getExplorerPath({ transaction: this._value.hash });
  }

  get result() {
    return this._value;
  }
}
