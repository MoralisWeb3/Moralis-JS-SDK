import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisDataObject } from './abstract';
import { EvmAddress, EvmAddressish } from './EvmAddress';
import { EvmChain, EvmChainish } from './EvmChain';
import { EvmTransactionResponse } from './EvmTransactionResponse';
import { AccessListish, BytesLike } from './types';
import { maybe } from './utils';

export interface EvmTransactionInput {
  to?: null | EvmAddressish;
  from?: null | EvmAddressish;
  nonce?: null | BigNumberish;

  gasLimit?: null | BigNumberish;
  gasPrice?: null | BigNumberish;
  gas?: null | BigNumberish;

  data?: null | BytesLike;
  value?: null | BigNumberish;
  chain?: null | EvmChainish;

  type?: null | number;
  accessList?: null | AccessListish;

  maxPriorityFeePerGas?: null | BigNumberish;
  maxFeePerGas?: null | BigNumberish;
  blockHash?: null | string;
  blockNumber?: null | number;
  transactionIndex?: null | number;
  input?: null | string;
}

export interface EvmTransactionData {
  to?: EvmAddress;
  from?: EvmAddress;
  nonce?: BigNumber;

  gasLimit?: BigNumber;
  gasPrice?: BigNumber;
  gas?: null | BigNumberish;

  data?: BytesLike;
  value?: BigNumber;
  chain?: EvmChain;

  type?: number;
  accessList?: AccessListish;

  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  blockHash?: null | string;
  blockNumber?: null | number;
  transactionIndex?: null | number;
  input?: null | string;
}

interface EthersJsTransactionRequest {
  to?: string;
  from?: string;
  nonce?: BigNumberish;

  gasLimit?: BigNumberish;
  gasPrice?: BigNumberish;

  data?: BytesLike;
  value?: BigNumberish;
  chainId?: number;

  type?: number;
  accessList?: AccessListish;

  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;
}

export class EvmTransaction implements MoralisDataObject {
  private _value;
  private _sendCall;

  constructor(value: EvmTransactionInput, sendCall?: (value: EvmTransaction) => Promise<EvmTransactionResponse>) {
    this._value = EvmTransaction.parse(value);
    this._sendCall = sendCall;
  }

  static create(
    transaction: EvmTransactionInput | EvmTransaction,
    sendCall?: (value: EvmTransaction) => Promise<EvmTransactionResponse>,
  ): EvmTransaction {
    if (transaction instanceof EvmTransaction) {
      return transaction;
    }

    return new EvmTransaction(transaction, sendCall);
  }

  static parse(value: EvmTransactionInput): EvmTransactionData {
    return {
      to: maybe(value.to, EvmAddress.create),
      from: maybe(value.from, EvmAddress.create),
      nonce: maybe(value.nonce, BigNumber.from),

      gasLimit: maybe(value.gasLimit, BigNumber.from),
      gasPrice: maybe(value.gasPrice, BigNumber.from),
      gas: maybe(value.gasPrice, BigNumber.from),

      data: maybe(value.data),
      value: maybe(value.value, BigNumber.from),
      chain: maybe(value.chain, EvmChain.create),

      type: maybe(value.type),
      accessList: maybe(value.accessList),

      maxPriorityFeePerGas: maybe(value.maxPriorityFeePerGas, BigNumber.from),
      maxFeePerGas: maybe(value.maxFeePerGas, BigNumber.from),
      input: value.input,
      transactionIndex: maybe(value.transactionIndex),
      blockHash: maybe(value.blockHash),
      blockNumber: maybe(value.blockNumber),
    };
  }

  equals(value: this): boolean {
    return JSON.stringify(value.toJSON()) === JSON.stringify(this.toJSON());
  }

  toEthRequest(): EthersJsTransactionRequest {
    const { chain, ...value } = this._value;

    return {
      ...value,
      to: value.to?.checksum,
      from: value.from?.checksum,
      chainId: chain?.decimal,
    };
  }

  send = () => {
    if (!this._sendCall) {
      throw new MoralisCoreError({
        code: CoreErrorCode.GENERIC_CORE_ERROR,
        message: 'Cannot send transaction, no supported call method provided',
      });
    }
    return this._sendCall(this);
  };

  toJSON() {
    const value = this._value;

    const out = {
      ...value,
      to: value.to?.format(),
      from: value.from?.format(),
      nonce: value.nonce?.toString(),
      gasLimit: value.gasLimit?.toString(),
      gasPrice: value.gasPrice?.toString(),
      gas: value.gas?.toString(),
      value: value.value?.toString(),
      chain: value.chain?.format(),
      maxPriorityFeePerGas: value.maxPriorityFeePerGas?.toString(),
      maxFeePerGas: value.maxFeePerGas?.toString(),
      input: value.input,
      transactionIndex: value.transactionIndex,
      blockHash: value.blockHash,
      blockNumber: value.blockNumber?.toString(),
    };

    return out;
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
