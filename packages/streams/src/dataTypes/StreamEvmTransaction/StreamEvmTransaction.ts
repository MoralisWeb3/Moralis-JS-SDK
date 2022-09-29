import MoralisCore, { MoralisCoreProvider } from '@moralisweb3/core';
import { EvmTransaction, EvmTransactionInput } from '@moralisweb3/evm-utils';
import { StreamData } from '../StreamData';

type StreamEvmTransactionInput = EvmTransactionInput & StreamData;
type StreamEvmTransactionish = StreamEvmTransaction | StreamEvmTransactionInput;

export class StreamEvmTransaction extends EvmTransaction {
  private _streamData: StreamData;

  constructor({ tag, streamType, streamId, ...data }: StreamEvmTransactionInput, core: MoralisCore) {
    super(data, core);
    this._streamData = { tag, streamType, streamId };
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

  get streamType() {
    return this._streamData.streamType;
  }
}
