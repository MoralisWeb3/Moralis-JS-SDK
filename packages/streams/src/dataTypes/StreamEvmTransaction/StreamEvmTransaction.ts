import MoralisCore, { MoralisCoreProvider } from '@moralisweb3/core';
import { EvmTransaction, EvmTransactionInput } from '@moralisweb3/evm-utils';
import { StreamData } from '../StreamData';

export type StreamEvmTransactionInput = EvmTransactionInput & StreamData;
type StreamEvmTransactionish = StreamEvmTransaction | StreamEvmTransactionInput;

export class StreamEvmTransaction extends EvmTransaction {
  private _streamData: StreamData;

  constructor({ tag, streamId, ...data }: StreamEvmTransactionInput, core: MoralisCore) {
    super(data, core);
    this._streamData = { tag, streamId };
  }

  static create(data: StreamEvmTransactionish, core?: MoralisCore) {
    if (data instanceof StreamEvmTransaction) {
      return data;
    }
    const finalCore = core ?? MoralisCoreProvider.getDefault();
    return new StreamEvmTransaction(data, finalCore);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      ...this._streamData,
    };
  }

  get tag() {
    return this._streamData.tag;
  }

  get streamId() {
    return this._streamData.streamId;
  }

  get input() {
    return this.data;
  }

  get transactionIndex() {
    return this.index;
  }

  get fromAddress() {
    return this.from;
  }

  get toAddress() {
    return this.to;
  }

  get receiptGasUsed() {
    return this.gasUsed;
  }

  get receiptCumulativeGasUsed() {
    return this.cumulativeGasUsed;
  }

  get receiptContractAddress() {
    return this.contractAddress;
  }
}
