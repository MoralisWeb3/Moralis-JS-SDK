import { BigNumber } from '@ethersproject/bignumber';
import { accessListify } from '@ethersproject/transactions';
import { MoralisDataObject, maybe, MoralisCoreError, CoreErrorCode } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmTransactionResponse } from '../EvmTransactionResponse/EvmTransactionResponse';
import { EvmNative } from '../EvmNative';
import { EvmTransactionInput, EvmTransactionData, EthersJsTransactionRequest } from './EvmTransactionTypes';

export type EvmTransactionish = EvmTransactionInput | EvmTransaction;

/**
 * The EvmTransaction class is a MoralisData that references an Evm transaction request,
 * that is meant to be sent to the network.
 *
 * @see EvmTransactionResponse for a published transaction that has been sent to the network
 * @see EvmTransactionReceipt for a confirmed transaction
 */
export class EvmTransaction implements MoralisDataObject {
  private _value;
  private _sendCall;

  constructor(value: EvmTransactionInput, sendCall?: (value: EvmTransaction) => Promise<EvmTransactionResponse>) {
    this._value = EvmTransaction.parse(value);
    this._sendCall = sendCall;
  }

  static create(
    transaction: EvmTransactionish,
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

      data: maybe(value.data),
      value: maybe(value.value, (val) => EvmNative.create(val, 'wei')),
      chain: maybe(value.chain, EvmChain.create),

      type: maybe(value.type),
      accessList: maybe(value.accessList, accessListify),

      maxPriorityFeePerGas: maybe(value.maxPriorityFeePerGas, BigNumber.from),
      maxFeePerGas: maybe(value.maxFeePerGas, BigNumber.from),
    };
  }

  static equals(providedTransactionA: EvmTransactionish, providedTransactionB: EvmTransactionish) {
    const transactionA = EvmTransaction.create(providedTransactionA);
    const transactionB = EvmTransaction.create(providedTransactionB);

    if (JSON.stringify(transactionA.toJSON()) === JSON.stringify(transactionB.toJSON())) {
      return true;
    }

    return false;
  }

  equals(value: EvmTransactionish): boolean {
    return EvmTransaction.equals(this, value);
  }

  toEthRequest(): EthersJsTransactionRequest {
    const { chain, ...value } = this._value;

    return {
      ...value,
      to: value.to?.checksum,
      from: value.from?.checksum,
      chainId: chain?.decimal,
      value: value.value?.format(),
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
      value: value.value?.toString(),
      chain: value.chain?.format(),
      maxPriorityFeePerGas: value.maxPriorityFeePerGas?.toString(),
      maxFeePerGas: value.maxFeePerGas?.toString(),
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
