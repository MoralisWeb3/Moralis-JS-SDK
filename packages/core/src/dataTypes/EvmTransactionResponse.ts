import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisDataObject } from './abstract';
import { EvmAddress, EvmAddressish } from './EvmAddress';
import { EvmChain, EvmChainish } from './EvmChain';
import { EvmNative, EvmNativeish } from './EvmNative';
import { EvmTransactionReceipt } from './EvmTransactionReceipt';
import { AccessList, AccessListish } from './types';
import { maybe } from './utils';

export interface EvmTransactionResponseInput {
  hash: string;
  nonce: BigNumberish;

  chain: EvmChainish;

  from: EvmAddressish;
  to?: null | EvmAddressish;
  value: EvmNativeish;

  confirmations?: null | number;

  blockNumber?: null | number;
  blockHash?: null | string;
  blockTimestamp?: null | number | Date;

  gasLimit?: BigNumberish;
  gasPrice?: null | BigNumberish;

  data: string;

  type?: null | number;

  accessList?: null | AccessListish;

  maxPriorityFeePerGas?: null | BigNumberish;
  maxFeePerGas?: null | BigNumberish;
}

type EvmTransactionResponseish = EvmTransactionResponseInput | EvmTransactionResponse;

interface EvmTransactionResponseData {
  hash: string;
  nonce: BigNumber;
  chain: EvmChain;

  from: EvmAddress;
  to?: EvmAddress;
  value: EvmNative;

  confirmations?: number;
  blockNumber?: number;
  blockHash?: string;
  blockTimestamp?: Date;

  gasLimit?: BigNumber;
  gasPrice?: BigNumber;

  data: string;

  type?: number;

  accessList?: AccessList;

  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
}

// type ResolveEvmTransaction = (confirmations?: number) => EvmTransactionReceipt

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

  static validate(value: EvmTransactionResponseInput) {
    return true;
  }

  static parse(value: EvmTransactionResponseInput): EvmTransactionResponseData {
    EvmTransactionResponse.validate(value);

    return {
      hash: value.hash,
      nonce: BigNumber.from(value.nonce),
      chain: EvmChain.create(value.chain),

      from: EvmAddress.create(value.from),
      to: maybe(value.to, EvmAddress.create),
      value: EvmNative.create(value.value, 'wei'),

      confirmations: maybe(value.confirmations),
      blockNumber: maybe(value.blockNumber),
      blockHash: maybe(value.blockHash),
      blockTimestamp: maybe(value.blockTimestamp, (value) => (value instanceof Date ? value : new Date(value))),

      gasLimit: maybe(value.gasLimit, BigNumber.from),
      gasPrice: maybe(value.gasPrice, BigNumber.from),

      data: maybe(value.data),

      type: maybe(value.type),

      maxPriorityFeePerGas: maybe(value.maxPriorityFeePerGas, BigNumber.from),
      maxFeePerGas: maybe(value.maxFeePerGas, BigNumber.from),
    };
  }

  equals(value: this): boolean {
    // Same hash on same chain
    return this._value.chain.equals(value._value.chain) && this._value.hash === value._value.hash;
  }

  wait = async (confirmations: number = 1) => {
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
        let ethError: any = error;
        let details: Record<string, unknown> = {};

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
